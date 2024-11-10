import { create } from "zustand";
import axios from "axios";

const useWishlistStore = create((set) => ({
  wishlist: [],

  // Fetches the wishlist for a specific user
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
      console.log("Adding to wishlist:", { userId, productId }); // userId ve productId'yi kontrol et
      const response = await axios.post("http://localhost:3000/api/wishlist/add", { userId, productId });
      set((state) => ({
        wishlist: [...state.wishlist, response.data],
      }));
    } catch (error) {
      console.error("Wishlist'e ürün eklenemedi:", error.response ? error.response.data : error.message);
    }
  },


  // Wishlist'ten ürün kaldır
  removeWishlistItem: async (userId,productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/wishlist/${userId}/${productId}`);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.productId !== productId),
      }));
    } catch (error) {
      console.error("Wishlist'ten ürün kaldırılamadı:", error);
    }
  },
}));

export default useWishlistStore;
