const jwt = require('jsonwebtoken');
const logger = require('../infrastructure/logging/logger');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    logger.warn('Authentication attempted without token');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(`Token verification failed: ${err.message}`);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
