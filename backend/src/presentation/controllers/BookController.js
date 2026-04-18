const BookUseCase = require('../../application/use-cases/BookUseCase');
const logger = require('../../infrastructure/logging/logger');

exports.createBook = async (req, res) => {
  try {
    const book = await BookUseCase.createBook(req.body);
    logger.info(`Book created: ${book.id} by ${req.user.id}`);
    res.status(201).json(book);
  } catch (error) {
    logger.error(`Error creating book: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookUseCase.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await BookUseCase.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await BookUseCase.updateBook(req.params.id, req.body);
    logger.info(`Book updated: ${book.id} by ${req.user.id}`);
    res.json(book);
  } catch (error) {
    logger.error(`Error updating book: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await BookUseCase.deleteBook(req.params.id);
    logger.info(`Book deleted: ${req.params.id} by ${req.user.id}`);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting book: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const query = req.query.q || '';
    const books = await BookUseCase.searchBooks(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
