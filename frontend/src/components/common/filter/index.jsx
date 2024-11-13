import React, { useState, useEffect } from 'react';
import { IoFilterSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Filter = ({ updateSearchParams, page }) => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [writers, setWriters] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedWriter, setSelectedWriter] = useState('');
 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    
    const fetchWriters = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products?limit=0');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        const products = data.products;
        const uniqueWriters = [...new Set(products.map(product => product.writer))];
        setWriters(uniqueWriters);
      } catch (error) {
        console.error('Error fetching writers:', error);
      }
    };
    
    

    fetchCategories();
    fetchWriters();
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const goToRoute = (key, value) => {
    const params = new URLSearchParams(window.location.search);

    if (key === 'category') {
      if (params.get(key) === value) {
        params.delete(key);
        setSelectedCategoryId('');
      } else {
        params.set(key, value);
        setSelectedCategoryId(value);
      }
    } else if (key === 'writer') {
      if (params.get(key) === value) {
        params.delete(key);
        setSelectedWriter('');
      } else {
        params.set(key, value);
        setSelectedWriter(value);
      }
    } 

    navigate(`/products/${page}?${params.toString()}`);
  };

  const handleCategoryClick = (category) => {
    goToRoute('category', category);
    updateSearchParams({ category });
  };

  const handleWriterClick = (writer) => {
    goToRoute('writer', writer);
    updateSearchParams({ writer });
  };



  // Reset all filters and refresh the page
  const handleReset = () => {
    setSelectedCategoryId('');
    setSelectedWriter('');
    updateSearchParams({});
    navigate(`/products/${page}`);

    // Refresh the page
    window.location.reload();
  };
  

  return (
    <div className='mt-[20px] '>
      <div className='flex justify-end md:hidden'>
        <button onClick={toggleFilter}>
          <IoFilterSharp size={24} className='text-[#ff5100]' />
        </button>
      </div>

      <div className={`px-[30px] min-w-[358px] ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
        <h2 className='mb-[20px] text-center text-[18px] font-semibold block md:hidden'>Filter</h2>
        
        {/* Categories Section */}
        <ul className='mb-[20px]'>
          <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px]'>Categories</p>
          <div className='max-h-[180px] overflow-y-auto'>
          {categories.map((category) => (
  <li 
    key={category._id} 
    className={`text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer capitalize hover:text-[#ff5100] transition ${selectedCategoryId === category._id ? 'text-[#ff5100]' : ''}`}
    onClick={() => handleCategoryClick(category._id)}
  >
    {category.name}
  </li>
))}
          </div>
        </ul>
        
        <hr />
        
        {/* Writer Section */}
        <ul className='mb-[20px]'>
          <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px]'>Writer</p>
          <div className='max-h-[180px] overflow-y-auto'>
            {writers.length > 0 ? (
              writers.map((writer, index) => (
                <li 
                  key={index} 
                  className={`text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition ${selectedWriter === writer ? 'text-[#ff5100]' : ''}`}
                  onClick={() => handleWriterClick(writer)}
                >
                  {writer}
                </li>
              ))
            ) : (
              <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px]'>No writers available</li>
            )}
          </div>
        </ul>
        
        <hr />
        

        {/* Reset Button */}
        <button 
          onClick={handleReset}
          className='px-3 bg-[#ff5100] text-white text-[14px] font-semibold py-[10px] mt-[10px] rounded'
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
