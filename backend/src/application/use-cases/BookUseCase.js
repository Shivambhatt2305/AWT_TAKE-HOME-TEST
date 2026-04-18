const bookRepository = require('../../infrastructure/repositories/BookRepository');

class BookUseCase {
  async createBook(data) {
    return await bookRepository.create(data);
  }

  async getAllBooks() {
    return await bookRepository.findAll();
  }

  async getBookById(id) {
    return await bookRepository.findById(id);
  }

  async updateBook(id, data) {
    const book = await bookRepository.update(id, data);
    if (!book) throw new Error('Book not found');
    return book;
  }

  async deleteBook(id) {
    const success = await bookRepository.delete(id);
    if (!success) throw new Error('Book not found');
    return true;
  }

  async searchBooks(query) {
    const books = await bookRepository.findAll();
    return books.filter(b => 
      b.title.toLowerCase().includes(query.toLowerCase()) || 
      b.author.toLowerCase().includes(query.toLowerCase()) ||
      b.isbn.includes(query)
    );
  }
}

module.exports = new BookUseCase();
