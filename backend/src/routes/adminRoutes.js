const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { requireRole } = require('../middleware/rbac');

// Base middleware to ensure only Admin users can access these routes
router.use(requireRole(['Admin', 'SuperAdmin']));

/**
 * @route GET /api/admin/audit-logs
 * @desc Get system audit logs
 * @access Admin
 */
router.get('/audit-logs', async (req, res) => {
  try {
    const logs = await prisma.adminAuditLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

/**
 * @route GET /api/admin/security-events
 * @desc Get security events
 * @access Admin, Security
 */
router.get('/security-events', requireRole(['SuperAdmin', 'Security']), async (req, res) => {
  try {
    const events = await prisma.securityEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security events' });
  }
});

/**
 * @route GET /api/admin/privacy-requests
 * @desc Get user privacy & data requests
 * @access Admin, Compliance
 */
router.get('/privacy-requests', requireRole(['SuperAdmin', 'Compliance']), async (req, res) => {
  try {
    const requests = await prisma.privacyRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch privacy requests' });
  }
});

module.exports = router;
