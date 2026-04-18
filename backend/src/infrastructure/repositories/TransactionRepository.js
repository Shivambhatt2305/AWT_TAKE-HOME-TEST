const crypto = require('crypto');
const Transaction = require('../../domain/entities/Transaction');

class TransactionRepository {
  constructor() {
    this.transactions = [];
  }

  async create(data) {
    const transaction = new Transaction(
      crypto.randomUUID(),
      data.userId,
      data.bookId,
      data.issueDate,
      data.dueDate,
      data.returnDate,
      data.status,
      data.fine
    );
    this.transactions.push(transaction);
    return transaction;
  }

  async findAll() {
    return this.transactions;
  }

  async findById(id) {
    return this.transactions.find(t => t.id === id);
  }
  
  async findActiveByUserId(userId) {
    return this.transactions.filter(t => t.userId === userId && t.status === 'issued');
  }

  async update(id, data) {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.transactions[index] = { ...this.transactions[index], ...data };
    return this.transactions[index];
  }
}

module.exports = new TransactionRepository();
