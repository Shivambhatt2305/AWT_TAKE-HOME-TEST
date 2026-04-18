const Book = require('../database/models/Book');

class BookRepository {
  async create(bookData) {
    const book = new Book(bookData);
    await book.save();
    return this._formatBook(book);
  }

  async findAll() {
    const books = await Book.find();
    return books.map(b => this._formatBook(b));
  }

  async findById(id) {
    const book = await Book.findById(id);
    return book ? this._formatBook(book) : null;
  }

  async update(id, data) {
    const book = await Book.findByIdAndUpdate(id, data, { new: true });
    return book ? this._formatBook(book) : null;
  }

  async delete(id) {
    const result = await Book.findByIdAndDelete(id);
    return result != null;
  }

  // Specific query logic moved here
  async checkBookAvailability(id) {
    const book = await Book.findById(id);
    if (!book) return false;
    return book.copiesAvailable > 0;
  }

  async updateBookStockOnIssue(id) {
    return await Book.findByIdAndUpdate(id, { $inc: { copiesAvailable: -1 } }, { new: true });
  }

  async updateBookStockOnReturn(id) {
    return await Book.findByIdAndUpdate(id, { $inc: { copiesAvailable: 1 } }, { new: true });
  }

  _formatBook(doc) {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    return obj;
  }
}

module.exports = new BookRepository();
