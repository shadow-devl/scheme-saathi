const express = require('express');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const { authenticate, restrictDemoMode } = require('./auth');
const communicationService = require('../services/communication/CommunicationService');

const prisma = new PrismaClient();
const router = express.Router();

// Normalize simple E.164 (Assuming frontend passes mostly normalized data with + code)
// Real production would use google-libphonenumber here
function normalizePhone(phone) {
  if (!phone) return null;
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned.startsWith('+')) return null;
  return cleaned;
}

// ----------------------------------------
// Send OTP (Phone Verification)
// ----------------------------------------
router.post('/phone/send-otp', authenticate, restrictDemoMode, async (req, res) => {
  try {
    const { phone } = req.body;
    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) return res.status(400).json({ error: 'Invalid international phone format.' });

    // Find or create ContactProfile
    let contactProfile = await prisma.contactProfile.findUnique({
      where: { userId_type_valueNormalized: { userId: req.user.id, type: 'PHONE', valueNormalized: normalizedPhone } }
    });

    if (!contactProfile) {
      contactProfile = await prisma.contactProfile.create({
        data: { userId: req.user.id, type: 'PHONE', valueNormalized: normalizedPhone, source: 'PROFILE' }
      });
    } else if (contactProfile.verificationStatus === 'VERIFIED') {
      return res.status(400).json({ error: 'Phone number already verified.' });
    }

    // Generate strict numeric OTP
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const tokenHash = crypto.createHash('sha256').update(rawOtp).digest('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Invalidate old OTPs for this contact
    await prisma.phoneOTP.updateMany({
      where: { contactProfileId: contactProfile.id, usedAt: null },
      data: { usedAt: new Date() } // Mark unused as invalidated
    });

    await prisma.phoneOTP.create({
      data: { contactProfileId: contactProfile.id, tokenHash, expiresAt }
    });

    await prisma.contactProfile.update({
      where: { id: contactProfile.id },
      data: { verificationStatus: 'VERIFICATION_SENT' }
    });

    // Send the OTP via SMS Provider
    const content = `Your Scheme Saathi verification code is: ${rawOtp}. Valid for 10 minutes.`;
    await communicationService.sendMessage({
      contactProfileId: contactProfile.id,
      channel: 'SMS',
      category: 'TRANSACTIONAL',
      to: normalizedPhone,
      content,
      isDemo: req.user.isDemo
    });

    res.json({ success: true, message: 'OTP sent successfully.' });
  } catch (err) {
    console.error('Send OTP Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Verify OTP
// ----------------------------------------
router.post('/phone/verify-otp', authenticate, restrictDemoMode, async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone || !otp) return res.status(400).json({ error: 'Phone and OTP required.' });

    const contactProfile = await prisma.contactProfile.findUnique({
      where: { userId_type_valueNormalized: { userId: req.user.id, type: 'PHONE', valueNormalized: normalizedPhone } }
    });

    if (!contactProfile) return res.status(404).json({ error: 'Contact not found.' });

    const tokenHash = crypto.createHash('sha256').update(otp).digest('hex');
    const otpRecord = await prisma.phoneOTP.findFirst({
      where: { contactProfileId: contactProfile.id, usedAt: null },
      orderBy: { createdAt: 'desc' }
    });

    if (!otpRecord) return res.status(400).json({ error: 'No active OTP found.' });

    if (otpRecord.attempts >= otpRecord.maxAttempts) {
      return res.status(400).json({ error: 'Too many attempts. Request a new OTP.' });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP expired.' });
    }

    if (otpRecord.tokenHash !== tokenHash) {
      await prisma.phoneOTP.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } }
      });
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    // Success
    await prisma.phoneOTP.update({
      where: { id: otpRecord.id },
      data: { usedAt: new Date() }
    });

    await prisma.contactProfile.update({
      where: { id: contactProfile.id },
      data: { verificationStatus: 'VERIFIED', verifiedAt: new Date() }
    });

    res.json({ success: true, message: 'Phone verified successfully.' });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Manage Subscriptions
// ----------------------------------------
router.post('/subscribe', authenticate, restrictDemoMode, async (req, res) => {
  try {
    const { channels, purpose = 'PLATFORM_UPDATES', consentVersion = '1.0' } = req.body; // channels: [{ channel: 'EMAIL', contact: 'email@...' }]

    if (!Array.isArray(channels) || channels.length === 0) {
      return res.status(400).json({ error: 'No channels specified.' });
    }

    const results = [];

    for (let c of channels) {
      let valueNorm = c.channel === 'PHONE' || c.channel === 'SMS' || c.channel === 'WHATSAPP' 
        ? normalizePhone(c.contact) : c.contact.trim().toLowerCase();
      
      const cType = (c.channel === 'SMS' || c.channel === 'WHATSAPP') ? 'PHONE' : 'EMAIL';

      const cp = await prisma.contactProfile.findUnique({
        where: { userId_type_valueNormalized: { userId: req.user.id, type: cType, valueNormalized: valueNorm } }
      });

      if (!cp || cp.verificationStatus !== 'VERIFIED') {
        results.push({ channel: c.channel, success: false, reason: 'Contact unverified or not found.' });
        continue;
      }

      await prisma.subscription.upsert({
        where: { userId_channel_purpose: { userId: req.user.id, channel: c.channel, purpose } },
        update: { status: 'ACTIVE', contactProfileId: cp.id, consentTimestamp: new Date(), consentVersion },
        create: {
          userId: req.user.id,
          contactProfileId: cp.id,
          channel: c.channel,
          purpose,
          status: 'ACTIVE',
          consentVersion
        }
      });
      results.push({ channel: c.channel, success: true });
    }

    res.json({ success: true, results });
  } catch (err) {
    console.error('Subscribe Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Public Newsletter Subscription
// ----------------------------------------
router.post('/public-subscribe', async (req, res) => {
  try {
    const { email, phone, channels } = req.body;
    
    // In a real production system, this would:
    // 1. Create an unverified Lead/Contact record
    // 2. Send a double opt-in email/SMS
    // 3. Only activate subscription upon click/OTP
    
    // For now, we will just validate format and return success
    if (channels.includes('EMAIL') && !email) {
      return res.status(400).json({ error: 'Email is required for EMAIL channel.' });
    }
    
    if ((channels.includes('SMS') || channels.includes('WHATSAPP')) && !phone) {
      return res.status(400).json({ error: 'Phone is required for SMS/WHATSAPP channels.' });
    }
    
    const normalizedPhone = phone ? normalizePhone(phone) : null;
    if (phone && !normalizedPhone) {
      return res.status(400).json({ error: 'Invalid international phone format.' });
    }

    res.json({ 
      success: true, 
      message: 'Subscription request received. Please check your messages for confirmation.' 
    });
  } catch (err) {
    console.error('Public Subscribe Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
