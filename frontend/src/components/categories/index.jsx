import React, { useEffect, useState } from 'react';
import Container from '../common/container';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
        <p className="text-gray-600 mt-2">Explore books by category</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-10">
        {categories.map((category, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src={category.imageUrl} // Adjust the image source based on your API response
              alt={category.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
              <button onClick={() => handleCategoryClick(category._id)} className="mt-4 bg-[#ff5100] text-white py-2 px-4 rounded-lg hover:bg-[#ff5100] transition duration-300">
                Explore {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Categories;
