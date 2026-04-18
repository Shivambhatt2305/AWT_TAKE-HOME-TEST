const logger = require('../infrastructure/logging/logger');

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      logger.warn(`User ${req.user ? req.user.id : 'unknown'} attempted to access restricted route`);
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = roleMiddleware;
