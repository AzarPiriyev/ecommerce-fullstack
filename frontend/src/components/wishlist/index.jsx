import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { GrBasket } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import Container from '../common/container';
import useWishlistStore from '../../store/wishlist';

const Wishlist = () => {
  const { fetchWishlist, wishlist, removeWishlistItem } = useWishlistStore();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchWishlist(userId);
    }
  }, [userId, fetchWishlist]);

  const handleRemoveFromWishlist = (productId) => {
    if (userId) {
      removeWishlistItem(userId, productId);
      alert("Wishlist'ten kaldırıldı.");
    } else {
      alert("Lütfen giriş yapın.");
    }
  };

  return (
    <Container>
      <div className="mt-8 mb-8">
        <h1 className="text-2xl text-gray-800 font-semibold text-center mb-8">Library</h1>
        <div className="grid grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {Array.isArray(wishlist) && wishlist.map((item, index) => (
            <div
              key={item.productId || index}
              className="p-4 max-w-[180px] mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative"
            >
              <div 
                className="absolute top-2 right-2 bg-white/70 p-1.5 rounded-full"
                onClick={() => handleRemoveFromWishlist(item.productId)}
              >
                <FaHeart className="text-2xl text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-200 mt-2 mr-2" />
              </div>

              <Link to={`/product/${item.productId}`}> {/* Dynamic link to ProductDetail page */}
                <img src={item.imageUrl} alt={item.name} className="rounded-lg mb-4 h-[200px]" />
                <p className="text-lg text-gray-700 font-semibold mb-1 overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
                <p className="text-lg text-gray-800 font-medium mb-3">${item.price}</p>
              </Link>

              <button className="flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600">
                <span>Add to Cart</span>
                <GrBasket />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Wishlist;
