import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    // Forward error to boundary or caller
    return Promise.reject(error);
  }
);

export const authService = {
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  register: (data) => api.post('/auth/register', data).then(res => res.data),
};

export const bookService = {
  getAll: () => api.get('/books').then(res => res.data),
  search: (query) => api.get(`/books/search?q=${query}`).then(res => res.data),
  create: (data) => api.post('/books', data).then(res => res.data),
  update: (id, data) => api.put(`/books/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/books/${id}`).then(res => res.data),
};

export const transactionService = {
  issue: (data) => api.post('/transactions/issue', data).then(res => res.data),
  renew: (id) => api.put(`/transactions/${id}/renew`).then(res => res.data),
  return: (id) => api.put(`/transactions/${id}/return`).then(res => res.data),
  history: (userId) => api.get(`/transactions/my-transactions${userId ? `?userId=${userId}` : ''}`).then(res => res.data),
};

export const reportService = {
  getOverdue: () => api.get('/reports/overdue').then(res => res.data),
  getPopular: () => api.get('/reports/popular').then(res => res.data),
  getInventory: () => api.get('/reports/inventory').then(res => res.data),
};

export const userService = {
  getAll: () => api.get('/users').then(res => res.data),
};

export default api;
