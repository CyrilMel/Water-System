<template>
  <Navbar class="bg">
    <template v-slot:modalNavLink>
      <div class="cart-wrapper">Your Cart ({{ quantity }})</div>
    </template>
  </Navbar>
  <div class="container py-5 mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 mb-3">
        <router-link to="/" class="text-primary">&lt; Homepage</router-link>
        <h4 class="mt-4">Purchases</h4>
        <div class="card p-3 shadow-sm">
          <div class="d-flex align-items-center">
            <img src="../assets/images/test-data-image.png" style="width: 70px;" alt="Product Image" class="me-3" />
            <div class="flex-grow-1">
              <h5>Mineral Water</h5>
              <p class="mb-3">Mineral Water Type 1</p>
              <div class="d-flex align-items-center">
                <span class="me-2">QTY</span>
                <button class="btn btn-primary" @click="decreaseQty">-</button>
                <input type="text" class="form-control text-center mx-2" v-model="quantity" style="width: 50px;" disabled>
                <button class="btn btn-primary" @click="increaseQty">+</button>
                <button class="btn text-danger ms-3" @click="removeItem">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <div class="mt-3">
                <label class="form-check-label">
                  <input type="radio" v-model="gallonType" value="refill" class="form-check-input"> Refill (₱40)
                </label>
                <label class="form-check-label ms-3">
                  <input type="radio" v-model="gallonType" value="new" class="form-check-input"> New Gallon (+₱40)
                </label>
              </div>
            </div>
            <p class="fw-bold text-center text-md-start">₱{{ gallonCost }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <h4 class="mb-4">Order Summary</h4>
        <h5>Initial Delivery Charges</h5>
        <p>Subtotal: <span class="float-end">₱{{ subtotal }}</span></p>
        <p>Delivery Fee: <span class="float-end">₱10.00</span></p>
        <p v-if="gallonType === 'new'">Gallon Type: <span class="float-end">New Gallon (₱40)</span></p>
        <hr>
        <p class="fw-bold">Total Amount: <span class="float-end">₱{{ totalCost }}</span></p>
       <router-link to="/finalcheckout"><button class="btn btn-primary w-100" @click="showModal = true">Proceed to Checkout</button></router-link> 
        <p class="mt-2 text-muted small">* By proceeding, you agree to a scheduled subscription with convenient delivery options.</p>
      </div>
    </div>
  </div>
<div>
  
</div>
 
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar
  },
  data() {
    return {
      quantity: 1,
      gallonType: 'refill',
      name: '',
      address: '',
      phone: '',
      showModal: false
    };
  },
  computed: {
    gallonCost() {
      return this.gallonType === 'refill' ? 40 : 80;
    },
    subtotal() {
      return (this.quantity * this.gallonCost).toFixed(2);
    },
    totalCost() {
      return (parseFloat(this.subtotal) + 10).toFixed(2);
    }
  },
  methods: {
    increaseQty() {
      this.quantity++;
    },
    decreaseQty() {
      if (this.quantity > 1) this.quantity--;
    },
    removeItem() {
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.modal-footer{
gap: 5px;
}
.bg {
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
}
.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
