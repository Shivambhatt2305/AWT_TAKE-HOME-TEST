import React, { useState } from 'react';
import { useLibrary } from '../../contexts/LibraryContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const ReportDashboard = () => {
  const { transactions, books } = useLibrary();
  const [activeTab, setActiveTab] = useState('overview');

  const statusCount = transactions.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { name: 'Issued', count: statusCount.issued || 0 },
    { name: 'Returned', count: statusCount.returned || 0 }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports Dashboard</h1>

      <div className="mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-600'}`}
        >
          History
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="border border-gray-300 p-6 bg-white">
          <h3 className="text-lg font-bold mb-4">Transaction Statistics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Book Name</th>
              <th className="border border-gray-300 px-4 py-2">Action Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {books.find(b => b.id == t.bookId)?.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {format(new Date(t.issueDate), 'MMM dd, yyyy')}
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {t.status}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="3" className="border border-gray-300 px-4 py-4 text-center text-gray-500">
                  No transactions history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportDashboard;
