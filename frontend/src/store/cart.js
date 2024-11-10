import { create } from 'zustand';
import axios from 'axios';

const useCartStore = create((set) => ({
  cart: [],
  isLoading: false,
  error: null,

  // Sepeti çekmek
  fetchCart: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/cart/get/${userId}`);
      const itemsWithQuantity = response.data.data.items.map(item => ({
        ...item,
        quantity: item.quantity || 1 // quantity yoksa varsayılan olarak 1 koyuyoruz
      }));
      set({ cart: itemsWithQuantity, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Sepete ürün eklemek
  addToCart: async (userId, productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3000/api/cart/add', {
        userId,
        productId,
        quantity 
      });
      set((state) => ({
        cart: [...state.cart, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Sepetteki ürünü güncellemek
  updateCartItemQty: async (userId, productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put('http://localhost:3000/api/cart/update-cart', {
        userId,
        productId,
        quantity,
      });
      set((state) => ({
        cart: state.cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Sepetten ürün silmek
  removeCartItem: async (userId, productId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`http://localhost:3000/api/cart/${userId}/${productId}`);
      set((state) => ({
        cart: state.cart.filter((item) => item.productId !== productId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
}));

export default useCartStore;
