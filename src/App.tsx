/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { QuickViewModal } from './components/common/QuickViewModal';

import { HomePage } from './components/pages/HomePage';
import { CataloguePage } from './components/pages/CataloguePage';
import { CategoriesBrowserPage } from './components/pages/CategoriesBrowserPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { AuthPages } from './components/pages/AuthPages';
import { CustomerDashboard } from './components/pages/CustomerDashboard';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { SellerOnboardingPage } from './components/pages/SellerOnboardingPage';
import { SellerDashboard } from './components/pages/SellerDashboard';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { 
  AboutPage, 
  ContactPage, 
  FaqsPage, 
  ShippingPolicyPage, 
  ReturnsPolicyPage, 
  LegalPolicyPage, 
  CustomerSupportPage 
} from './components/pages/StaticPages';

const MainContent: React.FC = () => {
  const { currentView, viewParam } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'catalogue':
        return <CataloguePage initialSearch={viewParam || undefined} />;
      case 'categories':
        return <CategoriesBrowserPage />;
      case 'category':
        return <CataloguePage initialCategory={viewParam || undefined} />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'login':
        return <AuthPages initialMode="login" />;
      case 'register':
        return <AuthPages initialMode="register" />;
      case 'account':
      case 'wishlist':
        return <CustomerDashboard />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faqs':
        return <FaqsPage />;
      case 'shipping-policy':
        return <ShippingPolicyPage />;
      case 'returns-policy':
        return <ReturnsPolicyPage />;
      case 'privacy':
        return <LegalPolicyPage type="privacy" />;
      case 'terms':
        return <LegalPolicyPage type="terms" />;
      case 'seller-register':
        return <SellerOnboardingPage />;
      case 'seller-dashboard':
        return <SellerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'support':
        return <CustomerSupportPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F6] text-[#202725] selection:bg-[#104D49] selection:text-white">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
