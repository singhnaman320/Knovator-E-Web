import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, MapPin, X, RefreshCw, AlertCircle } from 'lucide-react';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';
import CancelOrderModal from '../components/CancelOrderModal';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    orderId: null,
    orderNumber: null,
    orderAmount: null
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderAPI.getUserOrders();
      
      if (response.success) {
        setOrders(response.data.orders || []);
      } else {
        throw new Error(response.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to load orders');
      toast.error('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const generateShippingDate = (orderDate) => {
    const order = new Date(orderDate);
    // Add 2-7 days for shipping
    const daysToAdd = Math.floor(Math.random() * 6) + 2;
    const shippingDate = new Date(order);
    shippingDate.setDate(order.getDate() + daysToAdd);
    return shippingDate;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <MapPin className="h-4 w-4" />;
      case 'delivered':
        return <Package className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleRetry = () => {
    fetchOrders();
  };

  const handleCancelOrder = (orderId, orderNumber, orderAmount) => {
    setCancelModal({
      isOpen: true,
      orderId,
      orderNumber,
      orderAmount
    });
  };

  const confirmCancelOrder = async () => {
    try {
      const response = await orderAPI.cancelOrder(cancelModal.orderId);
      
      if (response.success) {
        toast.success('Order cancelled successfully! Refund will be processed within 3-5 business days.');
        // Refresh orders to show updated status
        fetchOrders();
        // Close modal
        setCancelModal({ isOpen: false, orderId: null, orderNumber: null, orderAmount: null });
      } else {
        throw new Error(response.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error(error.message || 'Failed to cancel order. Please try again.');
    }
  };

  const closeCancelModal = () => {
    setCancelModal({ isOpen: false, orderId: null, orderNumber: null, orderAmount: null });
  };

  const canCancelOrder = (status) => {
    return ['confirmed', 'processing'].includes(status.toLowerCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>

          {/* Orders Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track and manage your order history
          </p>
        </div>

        {/* Orders Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{orders.length}</span> orders
          </div>
          <button
            onClick={handleRetry}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            title="Refresh orders"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const shippingDate = generateShippingDate(order.createdAt);
              
              return (
                <div
                  key={order._id || order.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="card hover:shadow-lg transition-all duration-300 animate-slide-up"
                >
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Order #{order.orderId || order._id}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.items?.length || 0} items
                        </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Order Date</p>
                          <p className="font-medium text-gray-900">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Expected Delivery</p>
                          <p className="font-medium text-gray-900">
                            {formatDate(shippingDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Shipping Address</p>
                          <p className="font-medium text-gray-900">
                            {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    {order.items && order.items.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Items:</p>
                        <div className="flex flex-wrap gap-2">
                          {order.items.slice(0, 3).map((item, itemIndex) => (
                            <span
                              key={itemIndex}
                              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {item.productName} x{item.quantity}
                            </span>
                          ))}
                          {order.items.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                              +{order.items.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Order Actions */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                        Delivered to: {order.shippingAddress?.address}
                      </div>
                      {canCancelOrder(order.status) ? (
                        <button
                          onClick={() => handleCancelOrder(order._id || order.id, order.orderId || order._id, order.totalAmount)}
                          className="inline-flex items-center space-x-2 text-sm px-3 py-2 border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 rounded-md font-medium transition-colors"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel Order</span>
                        </button>
                      ) : (
                        <div className="text-sm text-gray-400">
                          {order.status === 'cancelled' ? 'Order Cancelled' : 
                           order.status === 'delivered' ? 'Order Delivered' : 
                           order.status === 'shipped' ? 'Order Shipped' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              to="/"
              className="btn-primary"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Cancel Order Modal */}
        <CancelOrderModal
          isOpen={cancelModal.isOpen}
          onClose={closeCancelModal}
          onConfirm={confirmCancelOrder}
          orderNumber={cancelModal.orderNumber}
          orderAmount={cancelModal.orderAmount}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
