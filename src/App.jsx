import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        {/* Auth routes without header/footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Main app routes with header/footer */}
        <Route path="/*" element={
          <>
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<ProductListingPage />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
