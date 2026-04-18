import React, { useState } from 'react';
import { useLibrary } from '../../contexts/LibraryContext';
import { useAuth } from '../../contexts/AuthContext';
import BookFormModal from './BookFormModal';

const BookList = () => {
  const { books, deleteBook } = useLibrary();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || book.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you confirm to delete this book?')) {
      deleteBook(id);
    }
  };

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book Catalog</h1>
        {user?.role === 'librarian' && (
          <button 
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Book
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="px-3 py-2 border border-gray-400 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-400 w-48 bg-white"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="issued">Issued</option>
        </select>
      </div>

      <table className="w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Book Title</th>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">ISBN</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            {user?.role === 'librarian' && (
              <th className="border border-gray-300 px-4 py-2 text-right">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? filteredBooks.map((book) => (
            <tr key={book.id}>
              <td className="border border-gray-300 px-4 py-2">{book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.author}</td>
              <td className="border border-gray-300 px-4 py-2">{book.isbn}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">{book.status}</td>
              {user?.role === 'librarian' && (
                <td className="border border-gray-300 px-4 py-2 text-right">
                  <button onClick={() => handleEdit(book)} className="text-blue-600 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(book.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              )}
            </tr>
          )) : (
            <tr>
              <td colSpan={user?.role === 'librarian' ? 5 : 4} className="border border-gray-300 px-4 py-4 text-center text-gray-500">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {isModalOpen && (
        <BookFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          book={editingBook} 
        />
      )}
    </div>
  );
};

export default BookList;
