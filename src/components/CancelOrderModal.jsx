import React, { useState } from 'react';
import { X, AlertTriangle, Package } from 'lucide-react';

const CancelOrderModal = ({ isOpen, onClose, onConfirm, orderNumber, orderAmount }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Cancel Order
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Order Details</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium text-gray-900">{orderNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">₹{orderAmount?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 text-sm leading-relaxed">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-xs font-medium">
                  💡 Refund Information
                </p>
                <p className="text-blue-700 text-xs mt-1">
                  Your refund will be processed within 3-5 business days and credited to your original payment method.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Cancelling...</span>
                  </div>
                ) : (
                  'Cancel Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
