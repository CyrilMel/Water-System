// stores/productStore.js
import { defineStore } from 'pinia';
import axios from '@/axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    selectedProductData: []
  }),

  actions: {
    async getProduct() {
      try {
        const response = await axios.get('/api/products');
        this.products = response.data.products;

        // Filter and store the selected data
        this.selectedProductData = this.products.map(product => ({
          product_name: product.product_name,
          container_type: product.container_type,
          price: product.price,
          product_image: product.product_image
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
});
