import React, { useState, useEffect } from 'react';
import { IoFilterSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Filter = ({updateSearchParams}) => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [writers, setWriters] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedWriter, setSelectedWriter] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();

        const uniqueCategories = [...new Set(products
          .filter(product => product.category)
          .map(product => product.category)
        )];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching writers:', error);
      }
    };
    const fetchWriters = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();

        const uniqueWriters = [...new Set(products
          .filter(product => product.writer)
          .map(product => product.writer)
        )];

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

    navigate(`/products/top-sellings?${params.toString()}`);
  };

  const handleCategoryClick = (category) => {
    goToRoute('category', category);
    updateSearchParams({ category }); // Обновляем параметры фильтра
  };

  const handleWriterClick = (writer) => {
    goToRoute('writer', writer);
    updateSearchParams({ writer }); // Обновляем параметры фильтра
  };

  return (
    <div className='mt-[20px]'>
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
            {categories.map((category, index) => (
              <li 
                key={index} 
                className={`text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition ${selectedCategoryId === category.name ? 'text-[#ff5100]' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
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
        
        {/* Price Section */}
        <ul className='mb-[20px]'>
          <p className='text-[16px] text-[#2f2f2f] font-medium py-[7px]'>Price</p>
          <div className='max-h-[180px] overflow-y-auto'>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>0 - 10</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>11 - 20</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>21 - 30</li>
            <li className='text-[14px] text-[#2f2f2f] font-normal py-[7px] cursor-pointer hover:text-[#ff5100] transition'>31+</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
