import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../common/container';
import { GrBasket } from "react-icons/gr";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from 'axios';
import useCartStore from '../../store/cart';
import useWishlistStore from '../../store/wishlist';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [userId, setUserId] = useState(null);
  const { addToCart } = useCartStore();
  const { fetchWishlist, addWishlistItem, removeWishlistItem, wishlist } = useWishlistStore();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user._id);
      fetchWishlist(user._id); 
    }
  }, [fetchWishlist]);

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);

        if (response.data.category) {
          const categoryResponse = await axios.get(`http://localhost:3000/api/categories/${response.data.category}`);
          setCategoryName(categoryResponse.data.name);
        }
      } catch (error) {
        console.error("Ürün verisi getirilemedi:", error);
      }
    };

    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    if (wishlist.some((item) => item.productId === id)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishlist, id]);

  const handleAddToCart = () => {
    if (userId) {
      const quantity = 1;
      addToCart(userId, product._id, quantity);
      alert("Added to cart.");
    } else {
      alert("Please log in.");
    }
  };

  const handleWishlistToggle = async () => {
    if (userId) {
      if (isInWishlist) {
        await removeWishlistItem(userId, product._id);
        setIsInWishlist(false); 
        alert("Removed from Wishlist.");
      } else {
        await addWishlistItem(userId, product._id);
        setIsInWishlist(true); 
        alert("Added to Wishlist.");
      }
    } else {
      alert("Please log in.");
    }
  };
  

  if (!product) return <p>Yükleniyor...</p>;

  return (
    <Container>
      <div className='mt-[40px] mb-[40px]'>
        <div className='mb-[40px] md:flex'>
          <div className='py-[20px] px-[50px] mb-[20px] flex justify-center md:justify-start'>
            <img src={product.imageUrl || "/src/assets/images/product.jpeg"} alt={product.name} className='max-w-[260px] max-h-[400px] xl:max-w-[260px] md:max-h-[400px] xl:min-h-[400px]'/>
          </div>

          <div className='md:px-[30px] md:py-[17px] md:min-w-[350px] lg:min-w-[500px] xl:min-w-[700px]'>
            <h1 className='text-[24px] text-[#2f2f2f] font-bold md:text-[24px] lg:text-[34px]'>{product.name}</h1>
            <p className='text-[14px] font-medium text-[#ff5100] mb-[20px]'>{product.writer}</p>
            <p className='text-[16px] font-medium text-[#2f2f2f] mb-[30px]'>{categoryName}</p>
            <div className='mb-[30px] md:flex md:justify-between'>
              <p className='text-[30px] font-semibold text-[#2f2f2f] text-center mb-[20px]'>${product.price}</p>
              <div>
                <button 
                  className='flex gap-2 border border-[#ff5100] bg-[#ff5100] py-[17px] justify-center rounded-[31px] w-full mb-2 md:px-[10px] lg:min-w-[225px] xl:min-w-[280px]'
                  onClick={handleAddToCart}
                >
                  <GrBasket className='text-white mt-[3px]' />
                  <p className='text-5 font-bold text-white'>Add to Cart</p>
                </button>
              </div>
            </div>
            <div className='flex gap-[10px]'>
              <div 
                className='border-2 border-[#fc521f] py-3 px-3 rounded-[50%] cursor-pointer'
                onClick={handleWishlistToggle}
              >
                {isInWishlist ? (
                  <FaHeart className='text-[#fc521f] h-[24px] w-[24px]' />
                ) : (
                  <FaRegHeart className='text-[#fc521f] h-[24px] w-[24px]' />
                )}
              </div>
              <p className='text-[14px] text-[#2f2f2f] font-normal mt-[15px]'>Add to Library</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className='mb-[20px] text-[20px] font-medium text-[#2f2f2f]'>About the Book</h3>
          <p className='text-[#2f2f2f] text-[16px] font-normal'>{product.description}</p>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;
