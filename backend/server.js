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

app.post('/api/match', async (req, res) => {
  const { category, annual_family_income, project_type, estimated_cost, age, gender, education, business_sector } = req.body;
  
  const schemes = await prisma.scheme.findMany();
  let recommendedScheme = null;
  
  if (project_type.toLowerCase() === 'education') {
    recommendedScheme = schemes.find(s => s.category === 'EDUCATION');
  } else if (project_type.toLowerCase() === 'agriculture') {
    recommendedScheme = schemes.find(s => s.category === 'AGRICULTURE') || schemes.find(s => s.category === 'TERM_LOAN');
  } else {
    if (estimated_cost <= 200000) {
      recommendedScheme = schemes.find(s => s.category === 'MICRO_FINANCE');
    } else {
      recommendedScheme = schemes.find(s => s.category === 'TERM_LOAN');
    }
  }

  if (!recommendedScheme && schemes.length > 0) {
    recommendedScheme = schemes[0];
  }

  res.json({ scheme: recommendedScheme });
});

app.post('/api/calculate-emi', (req, res) => {
  const { principal, annual_interest_rate, tenure_months, moratorium_months } = req.body;
  const repay_months = tenure_months - (moratorium_months || 0);
  const monthly_rate = (annual_interest_rate / 100) / 12;
  const emi = monthly_rate === 0 ? principal / repay_months : principal * monthly_rate * Math.pow(1 + monthly_rate, repay_months) / (Math.pow(1 + monthly_rate, repay_months) - 1);

  res.json({ emi: Math.round(emi * 100) / 100, moratorium_months });
});

app.post('/api/nearest-partners', async (req, res) => {
  const { latitude, longitude, required_loan_amount } = req.body;
  const partners = await prisma.partner.findMany();
  const eligiblePartners = partners
    .map(p => ({ ...p, distance: getDistanceFromLatLonInKm(latitude, longitude, p.latitude, p.longitude), remaining_budget: p.allocated_budget - p.disbursed_budget }))
    .filter(p => p.is_active === 1 && p.npa_percentage <= 10.0 && p.remaining_budget >= (required_loan_amount || 0))
    .sort((a, b) => a.distance - b.distance);

  res.json({ partners: eligiblePartners });
});

// ----------------------------------------
// PROTECTED API
// ----------------------------------------

app.post('/api/applications', authenticate, requireRole('APPLICANT'), async (req, res) => {
  try {
    const { partner_id, scheme_id, amount } = req.body;
    const newApp = await prisma.application.create({
      data: {
        application_id: 'APP_' + Date.now(),
        user_id: req.user.id,
        partner_id,
        scheme_id,
        status: 'PENDING',
        amount: parseFloat(amount) || 0,
        created_at: new Date().toISOString()
      }
    });
    res.json({ success: true, application: newApp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/applications/me', authenticate, requireRole('APPLICANT'), async (req, res) => {
  const apps = await prisma.application.findMany({ where: { user_id: req.user.id } });
  res.json(apps);
});

app.get('/api/partner/applications', authenticate, requireRole('PARTNER'), async (req, res) => {
  if (!req.user.partner_id) return res.status(403).json({ error: 'Not a partner' });
  const apps = await prisma.application.findMany({ where: { partner_id: req.user.partner_id } });
  res.json(apps);
});

app.patch('/api/partner/applications/:id', authenticate, requireRole('PARTNER'), async (req, res) => {
  const { status } = req.body;
  if (!req.user.partner_id) return res.status(403).json({ error: 'Not a partner' });
  
  try {
    await prisma.application.updateMany({
      where: {
        application_id: req.params.id,
        partner_id: req.user.partner_id
      },
      data: { status }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

app.get('/api/admin/analytics', authenticate, requireRole('ADMIN'), async (req, res) => {
  const apps = await prisma.application.findMany();
  const partners = await prisma.partner.findMany();
  
  const stats = {
    totalApplications: apps.length,
    approvedApplications: apps.filter(a => a.status === 'APPROVED' || a.status === 'DISBURSED').length,
    pendingApplications: apps.filter(a => a.status === 'PENDING').length,
    totalDisbursed: partners.reduce((sum, p) => sum + p.disbursed_budget, 0),
    totalAllocated: partners.reduce((sum, p) => sum + p.allocated_budget, 0),
    partnerNpas: partners.map(p => ({ name: p.partner_name, npa: p.npa_percentage }))
  };

  res.json(stats);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT} using Prisma with SQLite`);
});
