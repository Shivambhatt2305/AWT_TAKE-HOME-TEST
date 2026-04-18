import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Basic mock registration - auto proceed to login
    alert('Mock Registration Successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Create an account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              {...register('role')}
              className="w-full px-3 py-2 border border-gray-400 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="student">Student</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min length is 6' } })}
              className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
