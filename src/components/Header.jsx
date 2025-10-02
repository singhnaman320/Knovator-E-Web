import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Store, User, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <Store className="h-8 w-8" />
            <span className="text-xl font-bold">E-Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Products
            </Link>
            
            {isAuthenticated && (
              <Link
                to="/orders"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/orders'
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                My Orders
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            {isAuthenticated ? (
              <Link
                to="/cart"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/cart'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {cart.totalItems > 9 ? '9+' : cart.totalItems}
                    </span>
                  )}
                </div>
                <span className="font-medium">Cart</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2 text-gray-500 cursor-not-allowed">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Cart</span>
              </div>
            )}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user?.firstName}</span>
                </button>
                
                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[60]">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500 break-all">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
            {/* Navigation Links */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Products
            </Link>
            
            {isAuthenticated && (
              <Link
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/orders'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                My Orders
              </Link>
            )}

            {/* Cart Link */}
            {isAuthenticated ? (
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/cart'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {cart.totalItems > 9 ? '9+' : cart.totalItems}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart (Sign in required)</span>
              </div>
            )}

            {/* Auth Section */}
            <div className="border-t border-gray-200 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center btn-primary text-sm px-3 py-2"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
