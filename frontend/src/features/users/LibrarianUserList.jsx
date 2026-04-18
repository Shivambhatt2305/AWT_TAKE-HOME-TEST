import React, { useState } from 'react';
import { useLibrary } from '../../contexts/LibraryContext';

const LibrarianUserList = () => {
  const { users } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="px-3 py-2 border border-gray-400 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">
                {user.name || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.email}
              </td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {user.role}
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="3" className="border border-gray-300 px-4 py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LibrarianUserList;
