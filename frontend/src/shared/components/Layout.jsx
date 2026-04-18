import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user?.role === 'librarian' ? [
    { name: 'Dashboard', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Users', path: '/users' },
    { name: 'Reports', path: '/reports' },
    { name: 'Transactions', path: '/transactions' },
  ] : [
    { name: 'Dashboard', path: '/' },
    { name: 'Books', path: '/books' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Library System</h1>
        </div>
        
        <div className="flex-1 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-2 ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <div className="mb-2">
            <p className="text-sm font-medium">{user?.name || user?.email}</p>
            <p className="text-xs text-gray-400 capitalize">Role: {user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
