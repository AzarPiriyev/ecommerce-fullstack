import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '../common/filter';
import Container from '../common/container';
import { GrBasket } from "react-icons/gr";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const New = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [totalPages, setTotalPages] = useState(1); // Общее количество страниц
  const limit = 12; // Лимит продуктов на одну страницу

  const location = useLocation();
  const navigate = useNavigate();

  // Получение текущей страницы из URL или установка по умолчанию на 1
  const currentPage = new URLSearchParams(location.search).get('page') || 1;

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          params: { 
            page: currentPage,
            limit,
            newArrival: true // Добавляем параметр для новых продуктов
          }
        });
        setNewProducts(response.data.products); 
        setFilteredProducts(response.data.products); 
        setTotalPages(response.data.totalPages); 
      } catch (error) {
        console.error('Error fetching new products:', error);
      }
    };

    fetchNewProducts();
  }, [currentPage]); // Зависимость от currentPage для перезагрузки данных при изменении страницы

  useEffect(() => {
    const applyFilters = () => {
      const { category, writer, price } = searchParams;
      let filtered = newProducts;

      // Фильтрация по категории
      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }

      // Фильтрация по автору
      if (writer) {
        filtered = filtered.filter(product => product.writer === writer);
      }

      // Фильтрация по цене
      if (price) {
        const [minPrice, maxPrice] = price.split('-').map(Number);
        filtered = filtered.filter(product => 
          product.price >= (minPrice || 0) && (maxPrice ? product.price <= maxPrice : true)
        );
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [searchParams, newProducts]);

  const updateSearchParams = (params) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`); // Обновляем URL с новой страницей
  };

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : newProducts;

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <Filter updateSearchParams={updateSearchParams} page="new" />
        
        <div className="flex-1">
          <h1 className="text-[24px] text-[#2f2f2f] font-semibold text-center mb-6">New Products</h1>
          <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
            {productsToDisplay.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="shadow-lg rounded-lg overflow-hidden transform transition duration-200 hover:scale-105 bg-white">
                <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
                  <p className="text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">{product.writer}</p>
                  <p className="text-md font-semibold text-[#2f2f2f] mb-3">${product.price}</p>
                  <div className="flex items-center justify-between">
                    <button className="text-white bg-[#ff5100] py-1 px-3 rounded-lg text-sm font-semibold hover:bg-[#ff7833] transition duration-200 overflow-hidden whitespace-nowrap text-ellipsis">
                      Add to Cart
                    </button>
                    <GrBasket className="text-[#ff5100] text-xl" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Пагинация */}
          <div className="flex gap-3 justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index} 
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 border rounded-full font-semibold transition ${
                  Number(currentPage) === index + 1 
                    ? 'bg-gray-300 text-white' 
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default New;
