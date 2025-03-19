<template>
    <div class="container mt-5 mb-5">
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
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" required>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" required>
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
                <select class="form-select" id="paymentMethod" @change="handlePaymentChange">
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
          <div class="card p-4 h-100 shadow-lg rounded">
            <h4 class="mb-3">Order Summary</h4>
            <div class="d-flex align-items-center mb-3">
              <img src="../assets/images/test-data-image.png" alt="Mineral Water" class="img-thumbnail" width="80">
              <div class="ms-3">
                <p class="mb-0">Mineral Water</p>
                <small>₱40 per bottle</small>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <p>Estimated Subtotal:</p>
              <p>₱35.00</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Sales Tax:</p>
              <p>₱5.00</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Delivery Fee:</p>
              <p>₱10.00</p>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
              <p>Total:</p>
              <p>₱50.00</p>
            </div>
            <p class="text-muted mt-3">*We will bring your water within the day. Please be patient as we are getting a lot of orders. Thank you.</p>
            <button class="btn btn-primary w-100">Place Order</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />

  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    components:{
Navbar,
Footer
    },
    data() {
      return {
        showGcash: false,
      };
    },
    methods: {
  handlePaymentChange(event) {
    this.showGcash = event.target.value === 'gcash';
  },
  processGcashPayment() {
    window.location.href = "https://www.gcash.com"; // Simulated GCash payment page
  }
}


  };
  </script>
  
  <style scoped>
  .breadcrumb-item a {
    text-decoration: none;
    color: #007bff;
  }
  .card {
    border-radius: 15px;
    border: none;
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
  