import { create } from "zustand";
import axios from "axios";

const useWishlistStore = create((set) => ({
  wishlist: [],

  
  fetchWishlist: async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/wishlist/${userId}`);
      set({ wishlist: response.data.data.items });
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  },

  addWishlistItem: async (userId, productId) => {
    try {
      console.log("Adding to wishlist:", { userId, productId }); 
      const response = await axios.post("http://localhost:3000/api/wishlist/add", { userId, productId });
      set((state) => ({
        wishlist: [...state.wishlist, response.data],
      }));
    } catch (error) {
      console.error("Could not add product to Wishlist:", error.response ? error.response.data : error.message);
    }
  },


  
  removeWishlistItem: async (userId,productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/wishlist/${userId}/${productId}`);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.productId !== productId),
      }));
    } catch (error) {
      console.error("Could not remove item from Wishlist:", error);
    }
  },
}));

export default useWishlistStore;
