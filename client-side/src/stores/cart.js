import { defineStore } from 'pinia';
import axios from '@/axios';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {
      items: [],
    },
    loading: false,
    error: null,
  }),
  getters: {
    cartItems: (state) => state.cart?.items || [],
  },
  actions: {
    async fetchCart() {
      try {
        this.loading = true;
        const authStore = useAuthStore();
        const userId = authStore.user?._id;
        if (!userId) throw new Error("User not logged in");

        const res = await axios.get(`/api/cart/${userId}`);
        this.cart = res.data.cart;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.loading = false;
      }
    },

    async addToCart(product) {
      try {
        const authStore = useAuthStore(); 
        const userId = authStore.user?._id;
        if (!userId) throw new Error("User not logged in");

        const res = await axios.post('/api/cart', {
          userId,
          productId: product._id,
        });

        this.cart = res.data.cart;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      }
    },
    
    async updateQuantity(productId, quantity) {
      try {
        const authStore = useAuthStore();
        const userId = authStore.user?._id;
        if (!userId) throw new Error("User not logged in");
    
        const res = await axios.put(`/api/cart/${userId}/${productId}`, { quantity });
        this.cart = res.data.cart;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      }
    },

    async updateGallonType(productId, gallonType) {
      try {
        const authStore = useAuthStore();
        const userId = authStore.user?._id;

        if (!userId) throw new Error("User not logged in");
    
        const res = await axios.patch(`/api/cart/update-gallon/${userId}/${productId}`, {
          gallonType,
        });
        this.cart = res.data.cart;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      }
    },
    
    async clearCart() {
      try {
        const authStore = useAuthStore();
        const userId = authStore.user?._id;
        if (!userId) throw new Error("User not logged in");
    
        await axios.delete(`/api/cart/${userId}`); // Call your new backend route
    
        this.cart.items = []; // Clear frontend state
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      }
    },
    
    async removeFromCart(productId) {
      try {
        const authStore = useAuthStore();
        const userId = authStore.user?._id;
        if (!userId) throw new Error("User not logged in");

        const res = await axios.delete(`/api/cart/${userId}/${productId}`);
        this.cart = res.data.cart;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      }
    },
  }
});