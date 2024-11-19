import { create } from 'zustand';
import axios from 'axios';

const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  isLoading: false,
  error: null,

  
  fetchCart: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/cart/get/${userId}`);
      const itemsWithQuantity = response.data.data.items.map(item => ({
        ...item,
        quantity: item.quantity || 1
      }));
      set({ cart: itemsWithQuantity, isLoading: false });
      localStorage.setItem('cart', JSON.stringify(itemsWithQuantity)); 
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  
  addToCart: async (userId, productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3000/api/cart/add', {
        userId,
        productId,
        quantity
      });
      set((state) => {
        const newCart = [...state.cart, response.data];
        localStorage.setItem('cart', JSON.stringify(newCart)); 
        return { cart: newCart, isLoading: false };
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  
  updateCartItemQty: async (userId, productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put('http://localhost:3000/api/cart/update-cart', {
        userId,
        productId,
        quantity,
      });
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        return { cart: updatedCart, isLoading: false };
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  
  removeCartItem: async (userId, productId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`http://localhost:3000/api/cart/${userId}/${productId}`);
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        return { cart: updatedCart, isLoading: false };
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  
  setClose: () => {
    set({ cart: [] }); 
    localStorage.removeItem('cart'); 
  }
}));

export default useCartStore;
