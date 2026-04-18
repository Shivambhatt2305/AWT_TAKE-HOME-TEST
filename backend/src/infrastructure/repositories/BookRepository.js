const crypto = require('crypto');
const Book = require('../../domain/entities/Book');

class BookRepository {
  constructor() {
    this.books = [];
  }

  async create(bookData) {
    const book = new Book(
      crypto.randomUUID(),
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.copiesAvailable,
      bookData.totalCopies
    );
    this.books.push(book);
    return book;
  }

  async findAll() {
    return this.books;
  }

  async findById(id) {
    return this.books.find(b => b.id === id);
  }

  async update(id, data) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return null;
    this.books[index] = { ...this.books[index], ...data };
    return this.books[index];
  }

  async delete(id) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }
}

module.exports = new BookRepository();
