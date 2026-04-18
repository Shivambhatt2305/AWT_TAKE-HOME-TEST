const transactionRepository = require('../../infrastructure/repositories/TransactionRepository');
const bookRepository = require('../../infrastructure/repositories/BookRepository');

class ReportUseCase {
  async getOverdueBooks() {
    return await transactionRepository.findOverdueTransactions();
  }

  async getPopularBooks() {
    const transactions = await transactionRepository.findAll();
    const bookFrequency = {};
    
    transactions.forEach(t => {
      bookFrequency[t.bookId] = (bookFrequency[t.bookId] || 0) + 1;
    });

    const popular = Object.keys(bookFrequency).map(async bookId => {
      const book = await bookRepository.findById(bookId);
      return { book, issueCount: bookFrequency[bookId] };
    });

    const results = await Promise.all(popular);
    return results.sort((a, b) => b.issueCount - a.issueCount).slice(0, 10);
  }

  async getUserHistory(userId) {
    const transactions = await transactionRepository.findAll();
    const history = transactions.filter(t => t.userId === userId);
    
    for (let t of history) {
      t.book = await bookRepository.findById(t.bookId);
    }
    
    return history;
  }

  async getInventorySummary() {
    const books = await bookRepository.findAll();
    let totalTitles = books.length;
    let totalCopies = 0;
    let availableCopies = 0;

    books.forEach(b => {
      totalCopies += b.totalCopies;
      availableCopies += b.copiesAvailable;
    });

    return {
      totalTitles,
      totalCopies,
      availableCopies,
      issuedCopies: totalCopies - availableCopies
    };
  }
}

module.exports = new ReportUseCase();
