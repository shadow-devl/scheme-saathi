const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT) || 2525,
  auth: {
    user: process.env.SMTP_USER || 'testuser',
    pass: process.env.SMTP_PASS || 'testpass'
  }
});


const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_suraj_key_2026';

// Middleware for JWT Authentication
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Protect from demo users taking real actions
const restrictDemoMode = (req, res, next) => {
  if (req.user && req.user.isDemo) {
    return res.status(403).json({ error: 'Action not allowed in demo mode.' });
  }
  next();
};

// ----------------------------------------
// Registration
// ----------------------------------------
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Find requested role
    let dbRole = await prisma.role.findUnique({ where: { name: role } });
    if (!dbRole) {
      dbRole = await prisma.role.create({ data: { name: role, description: `${role} Role` } });
    }
    
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        status: 'PENDING',
        roles: {
          create: {
            roleId: dbRole.id
          }
        }
      },
      include: { roles: { include: { role: true } } }
    });
    
    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        userId: newUser.id,
        tokenHash: hashedToken,
        expiresAt
      }
    });

    // Send Verification Email
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173/scheme-saathi/#'}/verify-email?token=${verificationToken}`;
    
    console.log(`[Email System] Verification Link: ${verifyUrl}`);
    
    try {
      await transporter.sendMail({
        from: '"Scheme Saathi" <noreply@schemesaathi.com>',
        to: email,
        subject: 'Verify your email address',
        html: `<p>Welcome to Scheme Saathi!</p><p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">${verifyUrl}</a>`
      });
    } catch (emailErr) {
      console.error('Failed to send verification email:', emailErr);
    }
    
    const roleName = newUser.roles[0]?.role?.name || 'USER';
    const token = jwt.sign({ id: newUser.id, role: roleName, isDemo: false, status: 'PENDING' }, JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token, user: { id: newUser.id, name: newUser.name, role: roleName, email: newUser.email, status: newUser.status, isDemo: false } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Login
// ----------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { roles: { include: { role: true } } }
    });
    
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ error: 'Account is suspended. Please contact support.' });
    }

    const roleName = user.roles[0]?.role?.name || 'USER';

    const token = jwt.sign({ 
      id: user.id, 
      role: roleName, 
      isDemo: user.isDemo,
      status: user.status
    }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user.id, name: user.name, role: roleName, email: user.email, status: user.status, isDemo: user.isDemo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Demo Login
// ----------------------------------------
router.post('/demo', async (req, res) => {
  try {
    const { role } = req.body; // USER, ENTREPRENEUR, INVESTOR
    if (!['USER', 'ENTREPRENEUR', 'INVESTOR'].includes(role)) {
      return res.status(400).json({ error: 'Invalid demo role' });
    }

    // Generate a non-persistent session token for demo
    const sessionId = `demo_${crypto.randomBytes(16).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    
    await prisma.demoSession.create({
      data: { demoAccountType: role, sessionId, expiresAt }
    });

    const token = jwt.sign({ 
      id: sessionId, 
      role: role, 
      isDemo: true,
      status: 'ACTIVE'
    }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, user: { id: sessionId, name: `Demo ${role}`, role: role, email: `demo.${role.toLowerCase()}@schemesaathi.com`, status: 'ACTIVE', isDemo: true } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Verify Email
// ----------------------------------------
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const verification = await prisma.emailVerificationToken.findUnique({
      where: { tokenHash: hashedToken },
      include: { user: true }
    });

    if (!verification || verification.expiresAt < new Date() || verification.usedAt) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    await prisma.user.update({
      where: { id: verification.userId },
      data: { emailVerifiedAt: new Date(), status: 'ACTIVE' }
    });

    await prisma.emailVerificationToken.update({
      where: { id: verification.id },
      data: { usedAt: new Date() }
    });

    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// User Profile (Me)
// ----------------------------------------
router.get('/me', authenticate, async (req, res) => {
  try {
    if (req.user.isDemo) {
      return res.json({ id: req.user.id, name: `Demo ${req.user.role}`, role: req.user.role, email: `demo.${req.user.role.toLowerCase()}@schemesaathi.com`, status: 'ACTIVE', isDemo: true });
    }

    const user = await prisma.user.findUnique({ 
      where: { id: req.user.id },
      include: { roles: { include: { role: true } } }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const roleName = user.roles[0]?.role?.name || 'USER';
    res.json({ id: user.id, name: user.name, role: roleName, email: user.email, status: user.status, isDemo: user.isDemo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Forgot Password
// ----------------------------------------
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if user exists or not
      return res.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashedToken,
        expiresAt
      }
    });

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173/scheme-saathi/#'}/reset-password?token=${resetToken}`;
    console.log(`[Email System] Password Reset Link: ${resetUrl}`);

    try {
      await transporter.sendMail({
        from: '"Scheme Saathi Support" <support@schemesaathi.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset.</p><p>Click the link below to reset your password. The link expires in 1 hour.</p><a href="${resetUrl}">${resetUrl}</a>`
      });
    } catch (emailErr) {
      console.error('Failed to send reset email:', emailErr);
    }

    res.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// Reset Password
// ----------------------------------------
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token and password are required' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { tokenHash: hashedToken }
    });

    if (!resetRecord || resetRecord.expiresAt < new Date() || resetRecord.usedAt) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { id: resetRecord.userId },
      data: { password: hashedPassword }
    });

    await prisma.passwordResetToken.update({
      where: { id: resetRecord.id },
      data: { usedAt: new Date() }
    });

    res.json({ success: true, message: 'Password reset successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = {
  router,
  authenticate,
  restrictDemoMode
};
