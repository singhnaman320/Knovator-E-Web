import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';

const AuthContext = createContext();

// Auth reducer for state management
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    
    case 'SIGNUP_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Initial auth state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('ecommerce-token');
    const user = localStorage.getItem('ecommerce-user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({
          type: 'LOAD_USER',
          payload: {
            user: parsedUser,
            token: token
          }
        });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('ecommerce-token');
        localStorage.removeItem('ecommerce-user');
      }
    }
  }, []);

  // Save auth data to localStorage
  const saveAuthData = (user, token) => {
    localStorage.setItem('ecommerce-token', token);
    localStorage.setItem('ecommerce-user', JSON.stringify(user));
  };

  // Remove auth data from localStorage
  const removeAuthData = () => {
    localStorage.removeItem('ecommerce-token');
    localStorage.removeItem('ecommerce-user');
  };

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        const { user, token } = response.data;
        
        saveAuthData(user, token);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user,
            token
          }
        });
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        throw new Error(response.message || 'Login failed');
      }
      
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (userData) => {
    dispatch({ type: 'SIGNUP_START' });
    
    try {
      const response = await authAPI.signup(userData);
      
      if (response.success) {
        const { user, token } = response.data;
        
        saveAuthData(user, token);
        
        dispatch({
          type: 'SIGNUP_SUCCESS',
          payload: {
            user,
            token
          }
        });
        
        toast.success('Account created successfully!');
        return { success: true };
      } else {
        throw new Error(response.message || 'Signup failed');
      }
      
    } catch (error) {
      const errorMessage = error.message || 'Signup failed';
      dispatch({
        type: 'SIGNUP_FAILURE',
        payload: errorMessage
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    removeAuthData();
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully!');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...auth,
    login,
    signup,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
