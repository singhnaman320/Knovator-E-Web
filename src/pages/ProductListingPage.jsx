import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll();
      
      if (response.success) {
        // Backend sends: { success: true, data: { products: [...], count: 8 } }
        const products = response.data.products || [];
        setProducts(products);
      } else {
        throw new Error(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
      toast.error('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRetry = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={handleRetry}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of high-quality products designed to enhance your lifestyle.
          </p>
        </div>

        {/* Products Count */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{products.length}</span> products
          </div>
          <button
            onClick={handleRetry}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            title="Refresh products"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-slide-up"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any products at the moment.
            </p>
            <button
              onClick={handleRetry}
              className="btn-primary"
            >
              Refresh Products
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-primary-600 text-xl">🚚</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">
              Free shipping on all orders over ₹2,000
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-primary-600 text-xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">
              Your payment information is safe and secure
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-primary-600 text-xl">↩️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-600">
              30-day return policy for your peace of mind
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
