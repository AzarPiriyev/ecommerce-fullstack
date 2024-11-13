import React, { useEffect, useState } from 'react';
import Container from '../common/container';
import { GrBasket } from "react-icons/gr";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import useCartStore from '../../store/cart';

const ProductsCategories = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;
  const location = useLocation();
  const { addToCart } = useCartStore(); // Access the addToCart function
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user._id);
    }
  }, []);
  
  // URL'den kategori parametresini alıyoruz
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get('http://localhost:3000/api/products', {
        params: { page, limit, category }
      });
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, category]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (productId) => {
    if (userId) {
      const quantity = 1; // Default quantity
      addToCart(userId, productId, quantity);
      alert("Product added to cart!");
    } else {
      alert("Please log in to add products to the cart.");
    }
  };

  return (
    <Container>
      <div className="mt-8 mb-8">
        <h1 className="text-2xl text-gray-800 font-semibold text-center mb-8">Products</h1>
        <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="p-4 max-w-[180px] mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative">
                <Link to={`/product/${product._id}`}>
                  <img src={product.imageUrl || '/src/assets/images/new.jpeg'} alt={product.name} className="rounded-lg mb-4 h-[200px]" />
                  <p className="text-lg text-gray-700 font-semibold mb-1 overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
                  <p className="text-lg text-gray-800 font-medium mb-3">${product.price}</p>
                </Link>
                <button className="flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600"
                onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation
                    handleAddToCart(product._id);
                  }}>
                  <span>Add to Cart</span>
                  <GrBasket />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found for this category.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex gap-3 justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-10 h-10 border rounded-full font-semibold transition ${
                currentPage === index + 1 
                  ? 'bg-gray-300 text-white' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductsCategories;
