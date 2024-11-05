import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import HomePage from './pages/homePage';
import NewPage from './pages/newPage';
import ProductDetailPage from './pages/productDetailPage';
import CartPage from './pages/cartPage';
import WishlistPage from './pages/wishlistPage';
import ProductsPage from './admin/pages/productsPage';
import { useLocation } from 'react-router-dom';
import CategoriesPage from './pages/categoriesPage';
import UsersPage from './admin/pages/usersPage';
import ContactsPage from './admin/pages/contactsPage';
import FaqAdmin from './admin/pages/faqPages';
import CategoriesAdmin from './admin/pages/categoriesPage';
import ContactPage from './pages/contactPage';
import InformPage from './admin/pages/informPage';
import TopPages from './pages/topPages';
import FaqPage from './pages/faqPage';
import PriviacyPolicyPages from './pages/priviacyPolicyPages';
import CustomerSupportPages from './pages/customerSupportPages';
import DeliveryDetailsPage from './pages/deliveryDetailsPage';


function App() {
  const location = useLocation();

  const isProductsPage = location.pathname === '/admin';
  const isUsersPage = location.pathname === '/admin/users';
  const isContactsPage = location.pathname === '/admin/contacts';
  const isFaqAdmin = location.pathname === '/admin/faq';
  const isCategoriesAdmin = location.pathname === '/admin/categories';
  const isInformPage = location.pathname === '/admin/informs';

  return (
    <>
    {!isProductsPage && !isUsersPage && !isContactsPage && !isFaqAdmin && !isCategoriesAdmin && !isInformPage && <Header />}
      <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products/new" element={<NewPage />} />
    <Route path="/products/top-sellings" element={<TopPages />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/library" element={<WishlistPage />} />
    <Route path="/categories" element={<CategoriesPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/faq" element={<FaqPage />} />
    <Route path="/privacypolicy" element={<PriviacyPolicyPages />} />
    <Route path="/customersupport" element={<CustomerSupportPages />} />
    <Route path="/deliverydetails" element={<DeliveryDetailsPage />} />

    {/* Admin Panel */}
    <Route path="/admin" element={<ProductsPage />} />
    <Route path="/admin/users" element={<UsersPage/>} />
    <Route path="/admin/contacts" element={<ContactsPage/>} />
    <Route path="/admin/faq" element={<FaqAdmin/>} />
    <Route path="/admin/categories" element={<CategoriesAdmin/>} />
    <Route path="/admin/informs" element={<InformPage/>} />
      </Routes>
      {!isProductsPage && !isUsersPage && !isContactsPage && !isFaqAdmin && !isCategoriesAdmin && !isInformPage && <Footer />}
    </>
  )
}

export default App
