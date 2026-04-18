import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLibrary } from '../../contexts/LibraryContext';
import { format } from 'date-fns';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { transactions, books } = useLibrary();

  const myTransactions = transactions.filter(t => t.userId === user?.id);
  const myCurrentBooks = myTransactions.filter(t => t.status === 'issued');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name || user?.email}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-300 p-6">
          <h2 className="text-lg font-bold mb-4">Currently Borrowed</h2>
          {myCurrentBooks.length > 0 ? (
            <ul className="list-disc pl-5">
              {myCurrentBooks.map(t => {
                const book = books.find(b => b.id == t.bookId);
                return (
                  <li key={t.id} className="mb-2">
                    <strong>{book?.title || 'Unknown Book'}</strong>
                    <br />
                    <span className="text-sm">Issued: {format(new Date(t.issueDate), 'MMM dd, yyyy')}</span> | 
                    <span className="text-sm text-red-600"> Due: {format(new Date(t.dueDate), 'MMM dd, yyyy')}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
             <p className="text-gray-600">You have no currently borrowed books.</p>
          )}
        </div>

        <div className="border border-gray-300 p-6">
          <h2 className="text-lg font-bold mb-4">Transaction History</h2>
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 py-2">Book</th>
                <th className="border border-gray-300 px-3 py-2">Date</th>
                <th className="border border-gray-300 px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {myTransactions.map(t => (
                <tr key={t.id}>
                  <td className="border border-gray-300 px-3 py-2">
                    {books.find(b => b.id == t.bookId)?.title}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {format(new Date(t.issueDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 capitalize">
                    {t.status}
                  </td>
                </tr>
              ))}
              {myTransactions.length === 0 && (
                <tr>
                  <td colSpan="3" className="border border-gray-300 px-3 py-2 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
