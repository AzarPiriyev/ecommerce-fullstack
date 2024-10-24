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


function App() {
  const location = useLocation();

  const isProductsPage = location.pathname === '/admin';

  return (
    <>
    {!isProductsPage && <Header />}
      <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/new" element={<NewPage />} />
    <Route path="/product" element={<ProductDetailPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/library" element={<WishlistPage />} />
    <Route path="/categories" element={<CategoriesPage />} />
    {/* Admin Panel */}
    <Route path="/admin" element={<ProductsPage />} />
      </Routes>
      {!isProductsPage && <Footer />}
    </>
  )
}

export default App
