const fs = require('fs');
const path = require('path');

// On Render Free Tier, the root filesystem is read-only for files created during the build phase.
// To ensure SQLite is writable, we copy it to the writable /tmp directory at startup.
if (process.env.RENDER || process.env.NODE_ENV === 'production') {
  const sourceDb = path.join(__dirname, 'prisma', 'dev.db');
  const targetDb = '/tmp/dev.db';
  if (fs.existsSync(sourceDb)) {
    try {
      fs.copyFileSync(sourceDb, targetDb);
      process.env.DATABASE_URL = `file:${targetDb}`;
      console.log('Successfully copied SQLite DB to /tmp to ensure it is writable.');
    } catch (e) {
      console.error('Failed to copy SQLite DB to /tmp:', e);
    }
  } else {
    console.warn(`Source DB not found at ${sourceDb}`);
  }
}

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

// Ensure critical environment variables are set before starting
if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET is missing from the environment variables. The server cannot start securely.');
  process.exit(1);
}

// Health check endpoint for the root URL
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Scheme Saathi Backend API is running successfully!',
    version: '1.0.0'
  });
});

// Import new Auth routes and middleware
const authModule = require('./routes/auth');
const authenticate = authModule.authenticate;
const restrictDemoMode = authModule.restrictDemoMode;

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: `Requires one of roles: ${roles.join(', ')}` });
  }
  next();
};

app.use('/api/auth', authModule.router);

const webhooksRouter = require('./routes/webhooks');
app.use('/api/webhooks', webhooksRouter);

const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);


// PUBLIC API (Calculators & Matching)
// ----------------------------------------

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const DUMMY_SCHEMES = [
  { scheme_id: 'SCH_01', scheme_name: 'Micro-Finance Startup Fund', category: 'MICRO_FINANCE', corporation_code: 'NSFDC', max_loan_percentage: 80, interest_rate_beneficiary: 4.5, max_repayment_months: 60, max_moratorium_months: 6 },
  { scheme_id: 'SCH_02', scheme_name: 'Agriculture Tech Grant', category: 'AGRICULTURE', corporation_code: 'NSKFDC', max_loan_percentage: 90, interest_rate_beneficiary: 3.0, max_repayment_months: 84, max_moratorium_months: 12 },
  { scheme_id: 'SCH_03', scheme_name: 'Education Sector Loan', category: 'EDUCATION', corporation_code: 'NBCFDC', max_loan_percentage: 75, interest_rate_beneficiary: 5.0, max_repayment_months: 48, max_moratorium_months: 6 },
  { scheme_id: 'SCH_04', scheme_name: 'General Term Loan', category: 'TERM_LOAN', corporation_code: 'NSFDC', max_loan_percentage: 70, interest_rate_beneficiary: 7.0, max_repayment_months: 36, max_moratorium_months: 3 }
];

const DUMMY_PARTNERS = [
  { partner_id: 'P_01', partner_name: 'State Bank of India', latitude: 31.25, longitude: 75.70, allocated_budget: 5000000, disbursed_budget: 1000000, is_active: 1, npa_percentage: 2.5 },
  { partner_id: 'P_02', partner_name: 'HDFC Microfinance', latitude: 31.30, longitude: 75.75, allocated_budget: 2000000, disbursed_budget: 1500000, is_active: 1, npa_percentage: 4.0 },
  { partner_id: 'P_03', partner_name: 'Punjab National Bank', latitude: 31.20, longitude: 75.65, allocated_budget: 8000000, disbursed_budget: 2000000, is_active: 1, npa_percentage: 1.5 }
];

app.post('/api/match', async (req, res) => {
  try {
    const { category, annual_family_income, project_type, estimated_cost, age, gender, education, business_sector } = req.body;
    
    let recommendedScheme = null;
    
    if (project_type && project_type.toLowerCase() === 'education') {
      recommendedScheme = DUMMY_SCHEMES.find(s => s.category === 'EDUCATION');
    } else if (project_type && project_type.toLowerCase() === 'agriculture') {
      recommendedScheme = DUMMY_SCHEMES.find(s => s.category === 'AGRICULTURE') || DUMMY_SCHEMES.find(s => s.category === 'TERM_LOAN');
    } else {
      if (estimated_cost <= 200000) {
        recommendedScheme = DUMMY_SCHEMES.find(s => s.category === 'MICRO_FINANCE');
      } else {
        recommendedScheme = DUMMY_SCHEMES.find(s => s.category === 'TERM_LOAN');
      }
    }

    if (!recommendedScheme && DUMMY_SCHEMES.length > 0) {
      recommendedScheme = DUMMY_SCHEMES[0];
    }

    res.json({ scheme: recommendedScheme });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/calculate-emi', (req, res) => {
  const { principal, annual_interest_rate, tenure_months, moratorium_months } = req.body;
  const safe_principal = Number(principal) || 0;
  const safe_rate = Number(annual_interest_rate) || 0;
  const safe_tenure = Number(tenure_months) || 12;
  const safe_moratorium = Number(moratorium_months) || 0;
  
  const repay_months = Math.max(safe_tenure - safe_moratorium, 1);
  const monthly_rate = (safe_rate / 100) / 12;
  
  let emi = 0;
  if (monthly_rate === 0) {
    emi = safe_principal / repay_months;
  } else {
    emi = safe_principal * monthly_rate * Math.pow(1 + monthly_rate, repay_months) / (Math.pow(1 + monthly_rate, repay_months) - 1);
  }

  res.json({ emi: Math.round(emi * 100) / 100 || 0, moratorium_months: safe_moratorium });
});

app.post('/api/nearest-partners', async (req, res) => {
  try {
    const { latitude, longitude, required_loan_amount } = req.body;
    const eligiblePartners = DUMMY_PARTNERS
      .map(p => ({ ...p, distance: getDistanceFromLatLonInKm(latitude, longitude, p.latitude, p.longitude), remaining_budget: p.allocated_budget - p.disbursed_budget }))
      .filter(p => p.is_active === 1 && p.npa_percentage <= 10.0 && p.remaining_budget >= (required_loan_amount || 0))
      .sort((a, b) => a.distance - b.distance);

    res.json({ partners: eligiblePartners });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
// PROTECTED API
// ----------------------------------------

app.post('/api/applications', authenticate, requireRole('APPLICANT', 'USER'), async (req, res) => {
  try {
    const { partner_id, scheme_id, amount, estimated_cost } = req.body;
    const loanAmount = parseFloat(amount) || parseFloat(estimated_cost) || 0;
    
    const newApp = await prisma.application.create({
      data: {
        application_id: 'APP_' + Date.now(),
        user_id: req.user.id,
        partner_id: partner_id || 'UNKNOWN',
        scheme_id: scheme_id || 'UNKNOWN',
        status: 'PENDING',
        amount: loanAmount,
        created_at: new Date().toISOString()
      }
    });
    
    res.json({ success: true, application: newApp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/applications/me', authenticate, requireRole('APPLICANT', 'USER'), async (req, res) => {
  try {
    const apps = await prisma.application.findMany({
      where: { user_id: req.user.id },
      orderBy: { created_at: 'desc' }
    });
    
    // Map amount to estimated_cost for frontend
    const mapped = apps.map(a => ({ ...a, estimated_cost: a.amount }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/partner/applications', authenticate, requireRole('PARTNER'), async (req, res) => {
  try {
    const partnerId = req.user.partner_id || 'SCA_01'; // Fallback for testing
    const apps = await prisma.application.findMany({
      where: { partner_id: partnerId },
      orderBy: { created_at: 'desc' }
    });
    const mapped = apps.map(a => ({ ...a, estimated_cost: a.amount }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/partner/applications/:id', authenticate, requireRole('PARTNER'), async (req, res) => {
  try {
    const { status } = req.body;
    await prisma.application.update({
      where: { application_id: req.params.id },
      data: { status }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/analytics', authenticate, requireRole('ADMIN'), async (req, res) => {
  try {
    const apps = await prisma.application.findMany();
    
    let totalApplications = apps.length;
    let approvedApplications = apps.filter(a => a.status === 'APPROVED' || a.status === 'DISBURSED').length;
    let pendingApplications = apps.filter(a => a.status === 'PENDING').length;
    let totalDisbursed = apps.filter(a => a.status === 'DISBURSED' || a.status === 'APPROVED').reduce((sum, a) => sum + (a.amount || 0), 0);
    
    const stats = {
      totalApplications,
      approvedApplications,
      pendingApplications,
      totalDisbursed,
      totalAllocated: 50000000,
      partnerNpas: DUMMY_PARTNERS.map(p => ({ name: p.partner_name, npa: p.npa_percentage }))
    };
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT} using Prisma with SQLite`);
});
