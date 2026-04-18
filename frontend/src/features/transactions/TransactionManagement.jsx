import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLibrary } from '../../contexts/LibraryContext';

const IssueBookForm = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const { books, users, addTransaction } = useLibrary();
  const availableBooks = books.filter(b => b.status === 'available');

  const onSubmit = (data) => {
    addTransaction({
      bookId: data.bookId,
      userId: data.userId,
      issueDate: new Date().toISOString(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(), // 14 days later
      status: 'issued'
    });
    reset();
    if(onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-300 p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Issue Book</h3>
      <div className="mb-4">
        <label className="block mb-2">Select Book</label>
        <select {...register('bookId', { required: true })} className="w-full px-3 py-2 border border-gray-400">
          <option value="">-- Select a Book --</option>
          {availableBooks.map(b => (
            <option key={b.id} value={b.id}>{b.title} (ISBN: {b.isbn})</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select User</label>
        <select {...register('userId', { required: true })} className="w-full px-3 py-2 border border-gray-400">
          <option value="">-- Select a User --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name || u.email}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-2">Issue Book</button>
    </form>
  );
};

const ReturnBookForm = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const { transactions, books, users, returnBook } = useLibrary();
  const activeTransactions = transactions.filter(t => t.status === 'issued');

  const onSubmit = (data) => {
    const tId = Number(data.transactionId);
    returnBook(tId, new Date().toISOString(), 0);
    reset();
    if(onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-300 p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Return Book</h3>
      <div className="mb-4">
        <label className="block mb-2">Select Transaction</label>
        <select {...register('transactionId', { required: true })} className="w-full px-3 py-2 border border-gray-400">
          <option value="">-- Active Issues --</option>
          {activeTransactions.map(t => {
            const book = books.find(b => b.id == t.bookId);
            const user = users.find(u => u.id == t.userId);
            return (
              <option key={t.id} value={t.id}>
                {book?.title} - {user?.name || user?.email}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 mt-2">Return Book</button>
    </form>
  );
};

const TransactionManagement = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Transactions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IssueBookForm />
        <ReturnBookForm />
      </div>
    </div>
  );
};

export default TransactionManagement;
