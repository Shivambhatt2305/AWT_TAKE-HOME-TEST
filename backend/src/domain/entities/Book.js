class Book {
  constructor(id, title, author, isbn, copiesAvailable, totalCopies) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.copiesAvailable = copiesAvailable;
    this.totalCopies = totalCopies;
  }
}
module.exports = Book;
