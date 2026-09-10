const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Webhook endpoint for Twilio/MessageBird status updates
router.post('/messaging-status', async (req, res) => {
  try {
    // In a real implementation, you MUST verify the provider's signature here.
    // e.g. twilio.validateRequest(...)

    const { MessageSid, MessageStatus, ErrorCode } = req.body;
    
    // Some providers might send it as message_id and status
    const providerMessageId = MessageSid || req.body.message_id || req.body.id;
    const providerStatus = MessageStatus || req.body.status;

    if (!providerMessageId || !providerStatus) {
      return res.status(400).send('Bad Request: Missing ID or Status');
    }

    // Map provider status to internal status
    let internalStatus = 'SENT';
    const statusLower = providerStatus.toLowerCase();
    
    if (['delivered', 'read'].includes(statusLower)) {
      internalStatus = 'DELIVERED';
    } else if (['failed', 'undelivered', 'rejected'].includes(statusLower)) {
      internalStatus = 'FAILED';
    } else if (['queued', 'accepted'].includes(statusLower)) {
      internalStatus = 'QUEUED';
    }

    const message = await prisma.message.findUnique({
      where: { providerMessageId }
    });

    if (message) {
      // Idempotency: Don't downgrade status (e.g. from DELIVERED back to QUEUED)
      if (message.status === 'DELIVERED' || message.status === 'FAILED') {
        return res.status(200).send('OK');
      }

      const now = new Date();
      await prisma.message.update({
        where: { id: message.id },
        data: {
          status: internalStatus,
          failureReason: ErrorCode ? String(ErrorCode) : null,
          deliveredAt: internalStatus === 'DELIVERED' ? now : message.deliveredAt,
          failedAt: internalStatus === 'FAILED' ? now : message.failedAt,
        }
      });
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
