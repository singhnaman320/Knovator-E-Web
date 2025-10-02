import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Initial cart state
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Load cart from database when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      // Clear cart when user logs out
      setCart(initialState);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      if (response.success) {
        // Transform database cart format to match frontend format
        const dbCart = response.data;
        const transformedCart = {
          items: dbCart.items.map(item => ({
            id: typeof item.product === 'object' ? item.product._id : item.product,
            name: item.productName,
            price: item.price,
            image: item.image,
            quantity: item.quantity
          })),
          totalItems: dbCart.totalItems,
          totalAmount: dbCart.totalAmount
        };
        setCart(transformedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Fallback to empty cart on error
      setCart(initialState);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.addItem(product.id, 1);
      if (response.success) {
        await loadCart(); // Reload cart from database
        toast.success(`${product.name} added to cart!`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const item = cart.items.find(item => item.id === productId);
      const response = await cartAPI.removeItem(productId);
      if (response.success) {
        await loadCart(); // Reload cart from database
        if (item) {
          toast.success(`${item.name} removed from cart!`);
        }
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await cartAPI.updateItem(productId, quantity);
      if (response.success) {
        await loadCart(); // Reload cart from database
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (silent = false) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await cartAPI.clear();
      if (response.success) {
        setCart(initialState);
        if (!silent) {
          toast.success('Cart cleared!');
        }
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      if (!silent) {
        toast.error('Failed to clear cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const getItemQuantity = (productId) => {
    const item = cart.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cart.items.some(item => item.id === productId);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
