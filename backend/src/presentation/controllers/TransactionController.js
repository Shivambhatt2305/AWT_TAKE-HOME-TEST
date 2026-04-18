const TransactionUseCase = require('../../application/use-cases/TransactionUseCase');
const logger = require('../../infrastructure/logging/logger');

exports.issueBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    // Note: if user is student they might only issue for themselves.
    // If librarian, they provide userId.
    const targetUserId = req.user.role === 'librarian' ? userId : req.user.id;
    
    if (!targetUserId) return res.status(400).json({ message: 'User ID is required' });

    const transaction = await TransactionUseCase.issueBook(targetUserId, bookId);
    logger.info(`Book ${bookId} issued to User ${targetUserId} by ${req.user.id}`);
    res.status(201).json(transaction);
  } catch (error) {
    logger.error(`Error issuing book: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.renewBook = async (req, res) => {
  try {
    const transaction = await TransactionUseCase.renewBook(req.params.id);
    logger.info(`Transaction ${req.params.id} renewed by ${req.user.id}`);
    res.json(transaction);
  } catch (error) {
    logger.error(`Error renewing book: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const transaction = await TransactionUseCase.returnBook(req.params.id);
    logger.info(`Transaction ${req.params.id} returned by ${req.user.id}. Fine: ${transaction.fine}`);
    res.json(transaction);
  } catch (error) {
    logger.error(`Error returning book: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const targetUserId = req.user.role === 'librarian' && req.query.userId ? req.query.userId : req.user.id;
    const transactions = await TransactionUseCase.getUserTransactions(targetUserId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
