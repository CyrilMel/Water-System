<template>
  <div>
    <div class="container mt-4 mb-5">
      <div class="row justify-content-center">
        <!-- Left Side: Customer Information -->
        <div class="col-md-7">
          <div class="card p-4 h-100 shadow-lg rounded">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="checkout/cart">Cart</a></li>
                <li class="breadcrumb-item active" aria-current="page">Checkout</li>
              </ol>
            </nav>
            <h4 class="mb-3">Billing Information</h4>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control text-muted" v-model="auth.user.name" id="name" readonly >
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control text-muted" v-model="auth.user.email" id="email" readonly>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" required>
              </div>
              <div class="mb-3">
                <label for="apartment" class="form-label">Apartment (Optional)</label>
                <input type="text" class="form-control" id="apartment">
              </div>
              <div class="mb-3">
                <label for="mobile" class="form-label">Mobile Number</label>
                <input type="text" class="form-control" id="mobile" required>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="saveInfo">
                <label class="form-check-label" for="saveInfo">
                  Save your information for next order
                </label>
              </div>
              <div class="mb-3">
                <label for="paymentMethod" class="form-label">Payment Method</label>
                <select class="form-select" id="paymentMethod" v-model="paymentMethod" @change="handlePaymentChange">
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="gcash">GCash</option>
                </select>
              </div>
              <div v-if="showGcash" class="text-center mt-3">
                <button class="btn btn-info" @click.prevent="processGcashPayment">Pay with GCash</button>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Right Side: Order Summary -->
        <div class="col-md-5">
          <OrderSummary @place-order="submitOrder">
            <template #button="{ placeOrder }">
            <button class="btn btn-primary w-100" @click="placeOrder">Place Order</button>
            </template>
          </OrderSummary>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  import { useAuthStore } from "@/stores/auth";
  import { useCartStore } from "@/stores/cart";
  import OrderSummary from '@/components/OrderSummary.vue';
  import axios from '@/axios';
  export default {
    components:{
    Navbar,
    Footer,
    OrderSummary,
    },
    data() {
      return {
        showGcash: false,
        paymentMethod: "cod", 
      };
    },
    created() {
      this.auth = useAuthStore()
      this.cartStore = useCartStore();
    },
    methods: {
      async submitOrder() {
          try {
            const cartStore = useCartStore();
            const auth = this.auth;

            const response = await axios.post('/api/orders', {
              orderItems: cartStore.cart.items.map(item => ({
              productId: item.productId._id,
              quantity: item.quantity,
              price: item.productId.price?.$numberDecimal || 0,
            })),
            
              user: auth.user._id,
              total: cartStore.cart.items.reduce((acc, item) => acc + (item.quantity * parseFloat(item.productId.price?.$numberDecimal || 0)), 0),
              paymentMethod: this.paymentMethod
            });

            await cartStore.clearCart();

            this.$router.push('/');
          } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order.');
          }
      },
      handlePaymentChange(event) {
        this.showGcash = event.target.value === 'gcash';
      },
      processGcashPayment() {
        window.location.href = "https://www.gcash.com"; // Simulated GCash payment page
      }
    },
};
  </script>
  
  <style scoped>
  .breadcrumb-item a {
    text-decoration: none;
    color: #007bff;
  }
  select {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  select:hover {
    background-color: #f8f9fa;
  }
  button {
    transition: all 0.3s ease-in-out;
  }
  button:hover {
    transform: scale(1.05);
  }
  </style>
  