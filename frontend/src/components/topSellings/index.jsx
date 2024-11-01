import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '../common/filter';
import Container from '../common/container';
import { GrBasket } from "react-icons/gr";
import { Link } from 'react-router-dom';

const TopSellings = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        const filteredProducts = response.data.filter(product => product.topSelling);
        setTopSellingProducts(filteredProducts);
        setFilteredProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching top selling products:', error);
      }
    };

    fetchTopSellingProducts();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const params = new URLSearchParams();
      
      if (searchParams.category) {
        params.set("category", searchParams.category);
      }
      if (searchParams.writer) {
        params.set("writer", searchParams.writer);
      }
      if (searchParams.price) {
        params.set("price", searchParams.price);
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/products?${params.toString()}`);
        console.log(response.data); // API yanıtını kontrol edin

        const filteredProducts = response.data.filter(product => {
          const matchesCategory = searchParams.category ? product.category === searchParams.category : true;
          const matchesWriter = searchParams.writer ? product.writer === searchParams.writer : true;
          const matchesPrice = searchParams.price ? product.price <= searchParams.price : true; // Fiyat filtresi
          return matchesCategory && matchesWriter && matchesPrice; // Combine filters
        });

        console.log(filteredProducts); // Filtrelenmiş ürünleri kontrol edin
        setFilteredProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    if (searchParams.category || searchParams.writer || searchParams.price) {
      fetchFilteredProducts();
    } else {
      setFilteredProducts(topSellingProducts);
    }
  }, [searchParams, topSellingProducts]);

  const updateSearchParams = (params) => {
    setSearchParams(prev => ({ ...prev, ...params }));
    console.log('Updating search params:', params); // Добавьте эту строку
  };

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : topSellingProducts;

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8">
        <Filter updateSearchParams={updateSearchParams} />
        
        <div className="flex-1">
          <h1 className="text-[24px] text-[#2f2f2f] font-semibold text-center mb-6">Top Selling Products</h1>
          <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
            {productsToDisplay.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="shadow-lg rounded-lg overflow-hidden transform transition duration-200 hover:scale-105 bg-white">
                <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
                  <p className="text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">{product.writer}</p>
                  <p className="text-md font-semibold text-[#2f2f2f] mb-3">${product.price}</p>
                  <div className="flex items-center justify-between">
                    <button className="text-white bg-[#ff5100] py-1 px-3 rounded-lg text-sm font-semibold hover:bg-[#ff7833] transition duration-200">
                      Add to Cart
                    </button>
                    <GrBasket className="text-[#ff5100] text-xl" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopSellings;
