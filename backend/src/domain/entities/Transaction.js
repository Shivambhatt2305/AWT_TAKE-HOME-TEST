class Transaction {
  constructor(id, userId, bookId, issueDate, dueDate, returnDate, status, fine) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate || null;
    this.status = status || 'issued'; // issued, returned, renewed
    this.fine = fine || 0;
  }
}
module.exports = Transaction;
