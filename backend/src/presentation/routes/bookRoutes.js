const express = require('express');
const { body } = require('express-validator');
const BookController = require('../controllers/BookController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validateInput = require('../middlewares/validateInput');

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/search', BookController.searchBooks);
router.get('/:id', BookController.getBookById);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['librarian']),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('isbn').notEmpty().withMessage('ISBN is required'),
    body('totalCopies').isInt({ min: 1 }).withMessage('Total copies must be at least 1'),
    body('copiesAvailable').isInt({ min: 0 }).withMessage('Available copies must be valid')
  ],
  validateInput,
  BookController.createBook
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['librarian']),
  BookController.updateBook
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['librarian']),
  BookController.deleteBook
);

module.exports = router;
