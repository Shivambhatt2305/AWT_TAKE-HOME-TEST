const Transaction = require('../database/models/Transaction');

class TransactionRepository {
  async create(data) {
    const transaction = new Transaction(data);
    await transaction.save();
    return this._formatTx(transaction);
  }

  async findAll() {
    const txs = await Transaction.find().populate('bookId'); // populate implicitly helpful
    return txs.map(t => this._formatTx(t));
  }

  async findById(id) {
    const tx = await Transaction.findById(id);
    return tx ? this._formatTx(tx) : null;
  }

  async findActiveByUserId(userId) {
    const txs = await Transaction.find({ userId, status: 'issued' });
    return txs.map(t => this._formatTx(t));
  }

  async update(id, data) {
    const tx = await Transaction.findByIdAndUpdate(id, data, { new: true });
    return tx ? this._formatTx(tx) : null;
  }

  async findOverdueTransactions() {
    const currentDate = new Date();
    // Aggregation leveraging $gt, although intuitively overdue means dueDate < currentDate
    // So current date is $gt dueDate
    const overdue = await Transaction.aggregate([
      {
        $match: {
          status: 'issued',
          dueDate: { $lt: currentDate } // logically: dueDate < currentDate -> overdue
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book'
        }
      },
      { $unwind: '$book' }
    ]);
    
    return overdue.map(doc => {
      doc.id = doc._id.toString();
      doc.bookId = doc.book._id.toString();
      doc.userId = doc.userId.toString();
      return doc;
    });
  }

  _formatTx(doc) {
    const obj = doc.toObject ? doc.toObject() : doc;
    obj.id = obj._id ? obj._id.toString() : null;
    obj.userId = obj.userId ? obj.userId.toString() : null;
    obj.bookId = obj.bookId ? obj.bookId.toString() : null;
    return obj;
  }
}

module.exports = new TransactionRepository();
