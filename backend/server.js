const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
const JWT_SECRET = 'super_secret_suraj_key_2026';

// Health check endpoint for the root URL
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Avenik Entrepreneur OS Backend API is running successfully!',
    version: '1.0.0'
  });
});

// Middleware for JWT Authentication
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role, partner_id }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: `Requires ${role} role` });
  }
  next();
};

// ----------------------------------------
// AUTH API
// ----------------------------------------
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Find APPLICANT role
    let applicantRole = await prisma.role.findUnique({ where: { name: 'APPLICANT' } });
    if (!applicantRole) {
      applicantRole = await prisma.role.create({ data: { name: 'APPLICANT' } });
    }
    
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        roles: {
          create: {
            roleId: applicantRole.id
          }
        }
      },
      include: { roles: { include: { role: true } } }
    });
    
    const roleName = newUser.roles[0]?.role?.name || 'APPLICANT';
    const token = jwt.sign({ id: newUser.id, role: roleName }, JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token, user: { id: newUser.id, name: newUser.name, role: roleName, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { roles: { include: { role: true } } }
    });
    
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Handle legacy partner_id from seed if necessary (in future we will use BusinessMember or OrgMember)
    // For now we map role name
    const roleName = user.roles[0]?.role?.name || 'APPLICANT';
    let partnerId = null;
    if (user.id === 'user_p1') {
      partnerId = 'SCA_01'; // Mock for the seed partner
    }

    const token = jwt.sign({ id: user.id, role: roleName, partner_id: partnerId }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, role: roleName, email: user.email, partner_id: partnerId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----------------------------------------
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

app.post('/api/applications', authenticate, requireRole('APPLICANT'), async (req, res) => {
  try {
    const { partner_id, scheme_id, amount } = req.body;
    res.json({ 
      success: true, 
      application: {
        application_id: 'APP_' + Date.now(),
        user_id: req.user.id,
        partner_id,
        scheme_id,
        status: 'PENDING',
        amount: parseFloat(amount) || 0,
        created_at: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/applications/me', authenticate, requireRole('APPLICANT'), async (req, res) => {
  res.json([]);
});

app.get('/api/partner/applications', authenticate, requireRole('PARTNER'), async (req, res) => {
  res.json([
    { application_id: 'APP_1001', user_id: 'user_1', partner_id: req.user.partner_id, scheme_id: 'SCH_01', status: 'PENDING', amount: 500000, created_at: new Date().toISOString() },
    { application_id: 'APP_1002', user_id: 'user_2', partner_id: req.user.partner_id, scheme_id: 'SCH_02', status: 'APPROVED', amount: 1200000, created_at: new Date().toISOString() }
  ]);
});

app.patch('/api/partner/applications/:id', authenticate, requireRole('PARTNER'), async (req, res) => {
  res.json({ success: true });
});

app.get('/api/admin/analytics', authenticate, requireRole('ADMIN'), async (req, res) => {
  try {
    const stats = {
      totalApplications: 1240,
      approvedApplications: 850,
      pendingApplications: 290,
      totalDisbursed: 14500000,
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
