import React, { useState, useEffect } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Container from '../../common/container';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');

        const categories = await response.json();
        const categoryImages = categories.map(category => category.imageUrl); 
        setImages(categoryImages);
      } catch (error) {
        console.error('Error fetching category images:', error);
      }
    };

    fetchCategoryImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Container>
      <div className="relative w-full mt-[20px] mb-[20px]">
        
        <Link to={'/categories'}><div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                className="absolute block w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div></Link>

       
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? 'bg-white' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>

        
        <button
          onClick={handlePrev}
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <IoChevronBackOutline className="text-white" size={20} />
          </span>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <IoChevronForwardOutline className="text-white" size={20} />
          </span>
        </button>
      </div>
    </Container>
  );
};

export default Carousel;
