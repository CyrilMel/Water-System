<template>
  <Navbar class="bg" > 
    <template v-slot:modalNavLink>
           <div class="cart-wrapper">
            Your Cart (0)
           </div> 
    </template>
  </Navbar>
  <div class="container py-5 mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 mb-3">
        <router-link to="/" class="text-primary">&lt; Continue Shopping</router-link>
        <h4 class="mt-4">Recurring Purchases</h4>
        <div class="card p-3 shadow-sm">
          <div class="d-flex align-items-center">
            <img src="../assets/images/test-data-image.png" style="width: 70px;"  alt="Product Image" class="me-3" />
            <div class="flex-grow-1">
              <h5>Primo® Purified Bottled Water</h5>
              <p class="mb-5">5 Gallon Bottled Water, 1 Bottle</p>
              <div class="d-flex align-items-center">
              <span class="me-2">QTY</span>
              <button class="btn btn-primary" @click="decreaseQty">-</button>
              <input type="text" class="form-control text-center mx-2" v-model="quantity" style="width: 50px;" disabled>
              <button class="btn btn-primary" @click="increaseQty">+</button>
              <button class="btn text-primary">Remove</button>
              </div>
            </div>
            <p class="fw-bold text-center text-md-start">$7.99</p>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <h4 class="mb-4">Order Summary</h4>
        <h5>First Delivery Charges</h5>
        <p>Estimated Subtotal: <span class="float-end">$7.99</span></p>
        <p>Refundable Bottle Deposit: <span class="float-end">$7.00</span></p>
        <p>Taxes & Fees: <span class="float-end">$0.30</span></p>
        <hr>
        <p class="fw-bold">Estimated Total: <span class="float-end">$15.29</span></p>
        <button class="btn btn-primary w-100">Proceed to Checkout</button>
        <p class="mt-2 text-muted small">* You are signing up for a recurring subscription...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
 components : {
    Navbar
 },
 data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    increaseQty() {
      this.quantity++;
    },
    decreaseQty() {
      if (this.quantity > 1) this.quantity--;
    },
  },
}
</script>

<style scoped>
.bg{
  background: linear-gradient(135deg, #ffffff, #4aa3df);
  opacity: 85%;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}
.cart-wrapper {
  font-size: 1.5rem;
  font-weight: 600;
  color: #151515;
  padding: 10px 20px; 
  border-radius: 5px;
  position: absolute;   /* Absolutely position the cart */
  left: 50%;            /* Position it in the middle horizontally */
  transform: translateX(-50%);  /* Offset it back by half its width to truly center it */
}
.card {
  border-radius: 10px;
}

</style>