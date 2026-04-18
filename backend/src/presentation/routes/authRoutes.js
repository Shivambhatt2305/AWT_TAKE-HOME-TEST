const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const validateInput = require('../middlewares/validateInput');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validateInput,
  AuthController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').exists().withMessage('Password is required')
  ],
  validateInput,
  AuthController.login
);

module.exports = router;
