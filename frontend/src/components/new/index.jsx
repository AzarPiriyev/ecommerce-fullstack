import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '../common/filter';
import Container from '../common/container';
import { GrBasket } from "react-icons/gr";
import { Link } from 'react-router-dom';

const New = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        const filteredProducts = response.data.filter(product => product.newArrival);
        setNewProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching new products:', error);
      }
    };

    fetchNewProducts();
  }, []);

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8">
        <Filter />
        
        <div className="flex-1">
          <h1 className="text-[24px] text-[#2f2f2f] font-semibold text-center mb-6">New Products</h1>
          <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
            {newProducts.map((product) => (
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

          <div className="flex gap-3 justify-center mt-8">
            <button className="w-10 h-10 border border-gray-300 rounded-full bg-gray-300 text-white font-semibold hover:bg-gray-400 transition">1</button>
            <button className="w-10 h-10 border border-gray-200 rounded-full bg-gray-200 text-gray-500 font-semibold hover:bg-gray-300 transition">2</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default New;
