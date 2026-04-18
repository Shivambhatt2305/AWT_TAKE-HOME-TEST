import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LibraryProvider } from './contexts/LibraryContext';
import Layout from './shared/components/Layout';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import BookList from './features/books/BookList';
import StudentDashboard from './features/users/StudentDashboard';
import LibrarianUserList from './features/users/LibrarianUserList';
import TransactionManagement from './features/transactions/TransactionManagement';
import ReportDashboard from './features/reports/ReportDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
  return children;
};

const DashboardRouter = () => {
  const { user } = useAuth();
  if (user?.role === 'librarian') return <ReportDashboard />;
  if (user?.role === 'student') return <StudentDashboard />;
  return <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <LibraryProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<DashboardRouter />} />
              <Route path="books" element={<BookList />} />
              <Route 
                path="users" 
                element={
                  <ProtectedRoute allowedRoles={['librarian']}>
                    <LibrarianUserList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="transactions" 
                element={
                  <ProtectedRoute allowedRoles={['librarian']}>
                    <TransactionManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="reports" 
                element={
                  <ProtectedRoute allowedRoles={['librarian']}>
                    <ReportDashboard />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </LibraryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
