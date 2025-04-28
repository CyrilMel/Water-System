<template>
  <div>
  <Navbar class="navbar-bg">
    <template v-slot:modalNavLink>
      <div class="position-absolute start-50 translate-middle-x px-4 py-2 rounded fs-4 fw-semibold text-dark">Your Cart ({{ cartItems.length }})</div>
    </template>
  </Navbar>

  <div class="container py-5 mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 mb-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/" class="text-decoration-none">Home</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Cart</li>
          </ol>
        </nav>
        <h4 class="mt-4">Purchases</h4>

        <div v-if="cartItems.length === 0" class="alert alert-warning">
          Your cart is empty.
        </div>

        <div v-for="(item, index) in cartItems" :key="item.productId._id" class="card p-3 shadow-sm mb-3">
          <div class="d-flex align-items-center">
            <!-- Product Image -->
            <img :src="item.productId.product_image" alt="Product Image" class="me-3" style="width: 70px;" />
            <div class="flex-grow-1">
              <!-- Product Name -->
              <h5>{{ item.productId.product_name }}</h5>
              <p class="mb-3">{{ item.productId.product_type }}</p>

              <div class="d-flex align-items-center">
                <span class="me-2">QTY</span>
                <button class="btn btn-primary" @click="decreaseQty(index)">-</button>
                <input type="text" class="form-control text-center mx-2" v-model="item.quantity" style="width: 50px;" disabled>
                <button class="btn btn-primary" @click="increaseQty(index)">+</button>
                <button class="btn text-danger ms-3" @click="removeItem(index)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>

              <div class="mt-3">
                <label class="form-check-label">
                  <input 
                    type="radio" 
                    v-model="item.gallonType" 
                    :name="'gallonType-' + index" 
                    value="new" 
                    class="form-check-input"
                    checked
                    @change="updateGallonType(item.productId._id, item.gallonType)"
                  > New Gallon
                </label>
                <label class="form-check-label ms-3">
                  <input 
                    type="radio" 
                    v-model="item.gallonType" 
                    :name="'gallonType-' + index" 
                    value="refill" 
                    class="form-check-input"
                    @change="updateGallonType(item.productId._id, item.gallonType)"
                  > Refill (-₱40)
                </label>
              </div>
            </div>
              <p class="fw-bold text-center text-md-start">
                ₱{{ formatPrice(item.productId?.price?.$numberDecimal || 0) }}
              </p>          
            </div>
        </div>
      </div>

      <div class="col-md-5">
        <h4 class="mb-4">Order Summary</h4>
        <h5>Initial Delivery Charges</h5>
        <p>Subtotal: <span class="float-end">₱{{ subtotal }}</span></p>
        <p>Delivery Fee: <span class="float-end">Free</span></p>
        <p>Gallon Charges: <span class="float-end">₱{{ newGallonCharges }}</span></p>
        <hr>
        <p class="fw-bold">Total Amount: <span class="float-end">₱{{ totalCost }}</span></p>

        <router-link to="/finalcheckout">
          <button class="btn btn-primary w-100" @click="showModal = true">Proceed to Checkout</button>
        </router-link>

        <p class="mt-2 text-muted small">* By proceeding, you agree to a scheduled subscription with convenient delivery options.</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useCartStore } from '@/stores/cart';
import Navbar from '@/components/Navbar.vue';
import { formatPrice } from '@/utils/priceFormat';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      cartStore: useCartStore(),
      gallonType: 'new',
      showModal: false
    };
  },
  computed: {
    newGallonCharges() {
      return this.cartItems.reduce((total, item) => {
        if (item.gallonType === 'refill') {
          return total - 40 * item.quantity;
        }
        return total;
      }, 0).toFixed(2);
    },
    cartItems() {
      return this.cartStore.cart ? this.cartStore.cart.items : [];
    },
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.quantity * this.getItemCost(item)), 0).toFixed(2);
    },
    totalCost() {
      return (parseFloat(this.subtotal)).toFixed(2); // Add the delivery fee
    }
  },
  methods: {
    getItemCost(item) {
      const price = item?.productId?.price?.$numberDecimal;
      if (!price) return 0;
      const baseCost = parseFloat(price);
      return item.gallonType === 'new' ? baseCost - 40 : baseCost;
    },
    
    async updateGallonType(productId, gallonType) {
      try {
        await this.cartStore.updateGallonType(productId, gallonType);
        await this.cartStore.fetchCart(); // Refresh cart to get updated data
      } catch (error) {
        console.error("Failed to update gallon type:", error);
      }
    },

    async increaseQty(index) {
      const item = this.cartItems[index];
      const newQty = item.quantity + 1;
      await this.cartStore.updateQuantity(item.productId._id, newQty);
      await this.cartStore.fetchCart();
    },

    async decreaseQty(index) {
      const item = this.cartItems[index];
      if (item.quantity > 1) {
        const newQty = item.quantity - 1;
        await this.cartStore.updateQuantity(item.productId._id, newQty);
        await this.cartStore.fetchCart();
      }
    },

    async removeItem(index) {
      const productId = this.cartItems[index].productId._id;
      await this.cartStore.removeFromCart(productId);
      await this.cartStore.fetchCart();
    },

    updateCart(productId) {
      this.cartStore.removeFromCart(productId);
    },
    formatPrice(price) {
      return formatPrice(price);
    }
  },
  async mounted() {
    await this.cartStore.fetchCart();
  }
};
</script>