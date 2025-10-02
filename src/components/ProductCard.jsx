import React, { useState } from 'react';
import { Plus, Check, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    addToCart(product);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const inCart = isAuthenticated && isInCart(product.id);
  const quantity = isAuthenticated ? getItemQuantity(product.id) : 0;

  return (
    <div className="card group hover:shadow-lg transition-all duration-300 animate-fade-in">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {inCart && (
              <span className="text-xs text-green-600 font-medium">
                {quantity} in cart
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
              !isAuthenticated
                ? 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                : inCart
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105'
            }`}
            title={
              !isAuthenticated 
                ? 'Sign in to add to cart' 
                : inCart 
                ? 'Add another to cart' 
                : 'Add to cart'
            }
          >
            {!isAuthenticated ? (
              <Lock className="h-5 w-5" />
            ) : inCart ? (
              <Check className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
