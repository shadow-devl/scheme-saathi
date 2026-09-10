const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Middleware to check if the authenticated user has a specific role.
 * Assumes req.user is set by an earlier authentication middleware.
 * @param {string[]} allowedRoles - Array of roles allowed to access the route.
 */
const requireRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Fetch user's roles from DB
      const userRoles = await prisma.userRole.findMany({
        where: { userId: req.user.id },
        include: { role: true },
      });

      const roleNames = userRoles.map(ur => ur.role.name);

      const hasAccess = allowedRoles.some(role => roleNames.includes(role));

      if (!hasAccess) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('RBAC Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

module.exports = {
  requireRole,
};
