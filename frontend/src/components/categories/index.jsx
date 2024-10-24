import React from 'react';
import Container from '../common/container';

const Categories = () => {
  const categories = [
    { name: 'History', image: 'history.png' },
    { name: 'Literature', image: 'literature.jpg' },
    { name: 'Economy', image: 'economy.jpg' },
    { name: 'Psychology', image: 'Psychology.jpg' },
    { name: "Children's Books", image: 'children.png' },
  ];

  return (
    <Container>
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
        <p className="text-gray-600 mt-2">Explore books by category</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src={`/src/assets/images/${category.image}`}
              alt={category.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
              <button className="mt-4 bg-[#ff5100] text-white py-2 px-4 rounded-lg hover:bg-[#ff5100] transition duration-300">
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
