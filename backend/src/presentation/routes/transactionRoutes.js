const express = require('express');
const { body } = require('express-validator');
const TransactionController = require('../controllers/TransactionController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateInput = require('../middlewares/validateInput');

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/issue',
  [body('bookId').notEmpty().withMessage('Book ID is required')],
  validateInput,
  TransactionController.issueBook
);

router.put('/:id/renew', TransactionController.renewBook);
router.put('/:id/return', TransactionController.returnBook);
router.get('/my-transactions', TransactionController.getUserTransactions);

module.exports = router;
