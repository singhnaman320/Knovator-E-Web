import React from 'react';
import { Store } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Store className="h-6 w-6 text-primary-600" />
            <div>
              <span className="text-lg font-bold text-gray-900">E-Store</span>
              <p className="text-sm text-gray-600">Your one-stop shop for quality products</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              About Us
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              Contact
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} E-Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
