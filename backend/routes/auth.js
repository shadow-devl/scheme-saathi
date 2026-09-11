const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { validateEmail, validatePassword, validateRole } = require('../utils/authValidator');
const rateLimit = require('express-rate-limit');
const { OAuth2Client } = require('google-auth-library');
const jwksClient = require('jwks-rsa');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const msJwksClient = jwksClient({
  jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys'
});

function getMsKey(header, callback) {
  msJwksClient.getSigningKey(header.kid, function(err, key) {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

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
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});
const JWT_SECRET = process.env.JWT_SECRET;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests from this IP, please try again later.' }
});

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
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Only Gmail and Microsoft accounts are permitted.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    if (!validateRole(role)) {
      return res.status(400).json({ error: 'Invalid role selection.' });
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
      return res.status(400).json({ error: 'Role does not exist in the system.' });
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
    
    res.json({ success: true, message: 'Registration successful. Please check your email to verify your account.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' });
  }
});

// ----------------------------------------
// Login
// ----------------------------------------
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { roles: { include: { role: true } } }
    });
    
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const roleName = user.roles[0]?.role?.name || 'USER';
    const isPublicUser = ['USER', 'ENTREPRENEUR', 'INVESTOR', 'APPLICANT'].includes(roleName);

    if (isPublicUser && !validateEmail(email)) {
      return res.status(400).json({ error: 'Only Gmail and Microsoft accounts are permitted.' });
    }

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ error: 'Account is suspended. Please contact support.' });
    }

    if (user.status === 'PENDING') {
      return res.status(403).json({ error: 'Please verify your email address to log in.' });
    }

    const token = jwt.sign({ 
      id: user.id, 
      role: roleName, 
      isDemo: user.isDemo,
      status: user.status
    }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user.id, name: user.name, role: roleName, email: user.email, status: user.status, isDemo: user.isDemo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' });
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
    res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.', details: err.message, stack: err.stack });
  }
});

// ----------------------------------------
// Verify Email
// ----------------------------------------
router.post('/verify-email', authLimiter, async (req, res) => {
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
    res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' });
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
    res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' });
  }
});

// ----------------------------------------
// Forgot Password
// ----------------------------------------
router.post('/forgot-password', authLimiter, async (req, res) => {
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
    res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' });
  }
});

// ----------------------------------------
// Reset Password
// ----------------------------------------
router.post('/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token and password are required' });

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

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
    res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' });
  }
});

// OAuth: Google
router.post('/google', async (req, res) => {
  const { access_token } = req.body;
  
  if (!access_token) return res.status(400).json({ error: 'Missing access token' });

  try {
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    if (!userInfoRes.ok) {
      throw new Error('Failed to fetch user info from Google');
    }
    
    const payload = await userInfoRes.json();
    const email = payload.email.toLowerCase();
    
    let user = await prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } }
    });

    if (!user) {
      const defaultRole = await prisma.role.findUnique({ where: { name: 'USER' } });
      if (!defaultRole) return res.status(500).json({ error: 'Default role not found' });

      user = await prisma.user.create({
        data: {
          email,
          name: payload.name || 'Google User',
          password: '',
          status: 'ACTIVE',
          roles: {
            create: {
              roleId: defaultRole.id
            }
          }
        },
        include: { roles: { include: { role: true } } }
      });
    }

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ error: 'Account is suspended. Please contact support.' });
    }

    const roleName = user.roles[0]?.role?.name || 'USER';

    const token = jwt.sign({ 
      id: user.id, 
      role: roleName, 
      isDemo: user.isDemo,
      status: user.status
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name, role: roleName } });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

// OAuth: Microsoft
router.post('/microsoft', async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: 'Missing token' });

  try {
    jwt.verify(credential, getMsKey, { algorithms: ['RS256'] }, async (err, payload) => {
      if (err) {
        console.error('MS Auth Verify Error:', err);
        return res.status(401).json({ error: 'Invalid Microsoft token' });
      }

      const email = (payload.email || payload.preferred_username).toLowerCase();
      
      let user = await prisma.user.findUnique({
        where: { email },
        include: { roles: { include: { role: true } } }
      });

      if (!user) {
        const defaultRole = await prisma.role.findUnique({ where: { name: 'USER' } });
        if (!defaultRole) return res.status(500).json({ error: 'Default role not found' });

        user = await prisma.user.create({
          data: {
            email,
            name: payload.name || 'Microsoft User',
            password: '',
            status: 'ACTIVE',
            roles: {
              create: {
                roleId: defaultRole.id
              }
            }
          },
          include: { roles: { include: { role: true } } }
        });
      }

      if (user.status === 'SUSPENDED') {
        return res.status(403).json({ error: 'Account is suspended. Please contact support.' });
      }

      const roleName = user.roles[0]?.role?.name || 'USER';

      const token = jwt.sign({ 
        id: user.id, 
        role: roleName, 
        isDemo: user.isDemo,
        status: user.status
      }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name, role: roleName } });
    });
  } catch (err) {
    console.error('MS Auth Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  router,
  authenticate,
  restrictDemoMode
};
