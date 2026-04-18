const transactionRepository = require('../../infrastructure/repositories/TransactionRepository');
const bookRepository = require('../../infrastructure/repositories/BookRepository');

class TransactionUseCase {
  async issueBook(userId, bookId) {
    const book = await bookRepository.findById(bookId);
    if (!book) throw new Error('Book not found');
    if (book.copiesAvailable <= 0) throw new Error('No copies available');

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 14); // 14 days due limit

    const transaction = await transactionRepository.create({
      userId,
      bookId,
      issueDate: issueDate,
      dueDate: dueDate,
      status: 'issued',
      fine: 0
    });

    // Atomic update book inventory
    await bookRepository.updateBookStockOnIssue(bookId);

    return transaction;
  }

  async renewBook(transactionId) {
    const transaction = await transactionRepository.findById(transactionId);
    if (!transaction) throw new Error('Transaction not found');
    if (transaction.status !== 'issued') throw new Error('Book is not currently issued');

    const newDueDate = new Date(transaction.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 14);

    return await transactionRepository.update(transactionId, { 
      dueDate: newDueDate.toISOString(),
      status: 'renewed'
    });
  }

  async returnBook(transactionId) {
    const transaction = await transactionRepository.findById(transactionId);
    if (!transaction) throw new Error('Transaction not found');
    if (transaction.status === 'returned') throw new Error('Book already returned');

    const returnDate = new Date();
    const dueDate = new Date(transaction.dueDate);
    let fine = 0;

    if (returnDate > dueDate) {
      const diffTime = Math.abs(returnDate - dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      fine = diffDays * 10; // e.g. 10 units fine per day
    }

    const updatedTransaction = await transactionRepository.update(transactionId, {
      returnDate: returnDate,
      status: 'returned',
      fine
    });

    // Atomic update book inventory
    if (transaction.bookId) {
      await bookRepository.updateBookStockOnReturn(transaction.bookId);
    }

    return updatedTransaction;
  }

  async getUserTransactions(userId) {
    const transactions = await transactionRepository.findAll();
    return transactions.filter(t => t.userId === userId);
  }
}

module.exports = new TransactionUseCase();
