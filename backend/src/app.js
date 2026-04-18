require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./infrastructure/logging/logger');

// Routes
const authRoutes = require('./presentation/routes/authRoutes');
const bookRoutes = require('./presentation/routes/bookRoutes');
const userRoutes = require('./presentation/routes/userRoutes');
const transactionRoutes = require('./presentation/routes/transactionRoutes');
const reportRoutes = require('./presentation/routes/reportRoutes');

const app = express();

// Security and middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Global logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
