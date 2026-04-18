import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBooks, mockUsers, mockTransactions } from '../utils/mockData';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('library_books');
    return saved ? JSON.parse(saved) : mockBooks;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('library_users_data');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('library_transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('library_users_data', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('library_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addBook = (book) => setBooks([...books, { ...book, id: Date.now() }]);
  const updateBook = (updatedBook) => setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
  const deleteBook = (id) => setBooks(books.filter(b => b.id !== id));

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
    // Update book status
    if (transaction.status === 'issued') {
      const book = books.find(b => b.id == transaction.bookId);
      if (book) updateBook({ ...book, status: 'issued' });
    }
  };

  const returnBook = (transactionId, returnDate, fine) => {
    setTransactions(transactions.map(t => {
      if (t.id === transactionId) {
        return { ...t, status: 'returned', returnDate, fine };
      }
      return t;
    }));
    const t = transactions.find(t => t.id === transactionId);
    if (t) {
      const book = books.find(b => b.id == t.bookId);
      if (book) updateBook({ ...book, status: 'available' });
    }
  };

  return (
    <LibraryContext.Provider value={{
      books, addBook, updateBook, deleteBook,
      users,
      transactions, addTransaction, returnBook
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
