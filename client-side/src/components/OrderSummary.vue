<!-- src/components/OrderSummary.vue -->
<template>
    <div class="card p-4 h-100 shadow-lg rounded">
      <h4 class="mb-3">Order Summary</h4>
  
      <div v-for="item in cartItems" :key="item.productId._id" class="d-flex align-items-center mb-3">
        <img :src="item.productId.product_image" alt="Product" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: contain;">
        <div class="ms-3">
            <div class="d-flex justify-content-between">
              <p class="mb-0">{{ item.productId.product_name }}</p>
              <p>{{ item.gallonType }}</p>
            </div>
          <p class="mb-0">{{ item.quantity }}x</p>
          <small>₱{{ formatPrice(item.productId.price?.$numberDecimal || 0) }}</small>
        </div>
      </div>
  
      <hr>

      <div class="d-flex justify-content-between">
        <p>Container Reuse Discount:</p>
        <p>₱{{ newGallonCharges }}</p>
      </div>

      <div class="d-flex justify-content-between">
        <p>Estimated Subtotal:</p>
        <p>₱{{ subtotal }}</p>
      </div>
  
      <div class="d-flex justify-content-between">
        <p>Delivery:</p>
        <p>Free</p>
      </div>

      <hr>
  
      <div class="d-flex justify-content-between fw-bold">
        <p>Total Amount:</p>
        <p>₱{{ totalCost }}</p>
      </div>
  
      <p class="text-muted mt-3">
        *We will bring your water within the day. Please be patient as we are getting a lot of orders. Thank you.
      </p>
  
      <slot name="button" :placeOrder="placeOrder"></slot> <!-- Let parent pass custom buttons -->
    </div>
  </template>
  
<script setup>
import { useCartStore } from '@/stores/cart';
import { onMounted, computed } from 'vue';
import { formatPrice } from '@/utils/priceFormat';

  const cartStore = useCartStore();

  onMounted(() => {
    cartStore.fetchCart();
  });
  
  const emit = defineEmits(['place-order']);
  function placeOrder() {
  emit('place-order');
  }

  const cartItems = computed(() => cartStore.cart?.items || []);

  const subtotal = computed(() =>
    cartItems.value.reduce((total, item) => total + (item.quantity * cartStore.getTotalCost(item)), 0).toFixed(2)
  );

  const totalCost = computed(() => parseFloat(subtotal.value).toFixed(2));

  const newGallonCharges = computed(() => {
    const total = cartItems.value.reduce((sum, item) => {
      if (item.gallonType === 'refill') {
        return sum - 40 * item.quantity
      }
      return sum
    }, 0)
    return total.toFixed(2)
  })

</script>
<style scoped>
.card {
    border-radius: 15px;
    border: none;
  }
</style>  