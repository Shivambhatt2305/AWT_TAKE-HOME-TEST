import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLibrary } from '../../contexts/LibraryContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const { users } = useLibrary();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState('');

  const onSubmit = (data) => {
    const user = users.find(u => u.email === data.email);
    if (user && data.password === 'pass123') { // Hardcoded password for demo
      login({ ...user, token: 'fake-jwt-token-123' });
      navigate('/');
    } else {
      setErrorMsg('Invalid credentials. Use any mock email and "pass123".');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Library Login
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="admin@lib.test or alice@student.test"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="pass123"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {errorMsg && <p className="text-red-500 text-sm p-2 mb-4 bg-red-100 border border-red-200">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-600 hover:text-blue-800">Need an account? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
