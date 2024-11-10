import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../common/container';
import { GrBasket } from "react-icons/gr";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Add filled heart icon
import axios from 'axios';
import useCartStore from '../../store/cart';
import useWishlistStore from '../../store/wishlist';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);
  const { addToCart } = useCartStore(); 
  const { addWishlistItem, removeWishlistItem, wishlist } = useWishlistStore(); // Import removeWishlistItem
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Ürün verisi getirilemedi:", error);
      }
    };

    fetchProduct(id);
  }, [id]);

  // Check if the product is in the wishlist on component mount
  useEffect(() => {
    if (wishlist.some((item) => item.productId === id)) {
      setIsInWishlist(true);
    }
  }, [wishlist, id]);

  if (!product) return <p>Yükleniyor...</p>;

  const handleAddToCart = () => {
    if (userId) {
      const quantity = 1;
      addToCart(userId, product._id, quantity);
      alert("Sepete eklendi.");
    } else {
      alert("Lütfen giriş yapın.");
    }
  };

  const handleWishlistToggle = () => {
    if (userId) {
      if (isInWishlist) {
        removeWishlistItem(userId, product._id);
        alert("Wishlist'ten kaldırıldı.");
      } else {
        addWishlistItem(userId, product._id);
        alert("Wishlist'e eklendi.");
      }
      setIsInWishlist(!isInWishlist); // Toggle the wishlist state
    } else {
      alert("Lütfen giriş yapın.");
    }
  };

  return (
    <Container>
      <div className='mt-[40px] mb-[40px]'>
        <div className='mb-[40px] md:flex'>
          <div className='py-[20px] px-[50px] mb-[20px] flex justify-center md:justify-start'>
            <img src={product.imageUrl || "/src/assets/images/product.jpeg"} alt={product.name} className='w-[220px] h-[340px] xl:w-[260px] md:h-[400px]'/>
          </div>

          <div className='md:px-[30px] md:py-[17px] md:min-w-[350px] lg:min-w-[500px] xl:min-w-[700px]'>
            <h1 className='text-[34px] text-[#2f2f2f] font-bold'>{product.name}</h1>
            <p className='text-[14px] font-medium text-[#ff5100] mb-[20px]'>{product.writer}</p>
            <p className='text-[16px] font-medium text-[#2f2f2f] mb-[30px]'>{product.category}</p>
            <div className='mb-[30px] md:flex md:justify-between'>
              <p className='text-[30px] font-semibold text-[#2f2f2f] text-center mb-[20px]'>${product.price}</p>
              <div>
                <button 
                  className='flex gap-2 border border-[#ff5100] bg-[#ff5100] py-[17px] justify-center rounded-[31px] w-full mb-2 lg:min-w-[225px] xl:min-w-[280px]'
                  onClick={handleAddToCart}
                >
                  <GrBasket className='text-white mt-[3px]' />
                  <p className='text-5 font-bold text-white'>Add to Cart</p>
                </button>
                <p className='text-[16px] font-bold text-[#2e2e2e] text-center'>Available in {product.availability}</p>
              </div>
            </div>
            <div className='flex gap-[10px]'>
              <div 
                className='border-2 border-[#fc521f] py-3 px-3 rounded-[50%]'
                onClick={handleWishlistToggle} // Toggle on click
              >
                {isInWishlist ? (
                  <FaHeart className='text-[#fc521f] h-[24px] w-[24px]' /> // Red heart if in wishlist
                ) : (
                  <FaRegHeart className='text-[#fc521f] h-[24px] w-[24px]' /> // Outline if not in wishlist
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
