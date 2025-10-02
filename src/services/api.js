import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add JWT token to requests if available
    const token = localStorage.getItem('ecommerce-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle common errors
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    // Log error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: errorMessage,
    });
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// API endpoints
export const authAPI = {
  // User registration
  signup: (userData) => api.post('/auth/signup', userData),
  
  // User login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get user profile
  getProfile: () => api.get('/auth/profile'),
};

export const productAPI = {
  // Get all products
  getAll: () => api.get('/products'),
};

export const cartAPI = {
  // Get user's cart
  get: () => api.get('/cart'),
  
  // Add item to cart
  addItem: (productId, quantity = 1) => api.post('/cart/add', { productId, quantity }),
  
  // Update cart item quantity
  updateItem: (productId, quantity) => api.put(`/cart/item/${productId}`, { quantity }),
  
  // Remove item from cart
  removeItem: (productId) => api.delete(`/cart/item/${productId}`),
  
  // Clear entire cart
  clear: () => api.delete('/cart/clear'),
};

export const orderAPI = {
  // Place a new order (requires authentication)
  create: (orderData) => api.post('/orders', orderData),
  
  // Get user's orders (requires authentication)
  getUserOrders: () => api.get('/orders'),
  
  // Cancel an order (requires authentication)
  cancelOrder: (orderId) => api.patch(`/orders/${orderId}/cancel`),
};

export default api;
