import React from 'react';
import { useForm } from 'react-hook-form';
import { useLibrary } from '../../contexts/LibraryContext';

const BookFormModal = ({ isOpen, onClose, book }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: book || { title: '', author: '', isbn: '', status: 'available' }
  });
  const { addBook, updateBook } = useLibrary();

  const onSubmit = (data) => {
    if (book) {
      updateBook({ ...data, id: book.id });
    } else {
      addBook(data);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 w-full max-w-md border border-gray-400">
        <h3 className="text-xl font-bold mb-4">
          {book ? 'Edit Book' : 'Add New Book'}
        </h3>
        
        <form id="book-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input {...register('title', { required: 'Title is required' })} className="w-full px-3 py-2 border border-gray-400" />
            {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Author</label>
            <input {...register('author', { required: 'Author is required' })} className="w-full px-3 py-2 border border-gray-400" />
            {errors.author && <span className="text-red-500 text-sm mt-1">{errors.author.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">ISBN</label>
            <input {...register('isbn', { required: 'ISBN is required' })} className="w-full px-3 py-2 border border-gray-400" />
            {errors.isbn && <span className="text-red-500 text-sm mt-1">{errors.isbn.message}</span>}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select {...register('status')} className="w-full px-3 py-2 border border-gray-400">
              <option value="available">Available</option>
              <option value="issued">Issued</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 text-gray-800">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
