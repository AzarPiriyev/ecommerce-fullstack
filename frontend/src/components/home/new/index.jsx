import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Container from '../../common/container';
import { GrBasket } from "react-icons/gr";
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { Link } from 'react-router-dom';
import useCartStore from '../../../store/cart';

const New = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const { addToCart } = useCartStore(); 
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    const fetchNewArrivals = async (page = 1, limit = 6) => {
      try {
        const response = await fetch(`http://localhost:3000/api/products?page=${page}&limit=${limit}&newArrival=true`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setNewArrivals(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchNewArrivals();
  }, []);

  const NextArrow = ({ onClick }) => (
    <button 
      className="absolute right-[-20px] top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10" 
      onClick={onClick}
    >
      <IoChevronForwardOutline size={24} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button 
      className="absolute left-[-20px] top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10" 
      onClick={onClick}
    >
      <IoChevronBackOutline size={24} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleAddToCart = (productId) => {
    if (userId) {
      const quantity = 1; 
      addToCart(userId, productId, quantity);
      alert("Product added to cart!");
    } else {
      alert("Please log in to add products to the cart.");
    }
  };

  return (
    <Container>
      <div className="relative mb-10">
        <div className='py-2 flex justify-between mb-2'>
          <h1 className='text-[24px] font-semibold mb-6 text-[#2f2f2f]'>New</h1>
          <Link to={'/products/new'}>
            <p className='text-[20px] font-semibold text-[#979797] mt-1 underline cursor-pointer'>See All</p>
          </Link>
        </div>

        <Slider {...settings}>
          {newArrivals.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="p-4">
              <div className="shadow-lg rounded-lg overflow-hidden bg-white">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="h-56 w-40 mx-auto object-cover rounded-t-lg" 
                />
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">{product.author}</p>
                  <p className="text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">{product.writer}</p>
                  <p className="text-md font-semibold text-[#2f2f2f] mb-3">${product.price}</p>
                  <div className="flex items-center justify-between">
                    <button 
                      className="text-white bg-[#ff5100] py-1 px-3 rounded-lg text-sm font-semibold hover:bg-[#ff7833] transition duration-200"
                      onClick={(e) => {
                        e.preventDefault(); 
                        handleAddToCart(product._id);
                      }}
                    >
                      Add to Cart
                    </button>
                    <GrBasket className="text-[#ff5100] text-xl" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default New;
