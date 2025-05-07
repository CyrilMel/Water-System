<template>
  <div>
    <div class="container mt-4 mb-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card p-4 h-100 shadow-lg rounded">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/checkout/cart">Cart</a></li>
                <li class="breadcrumb-item active" aria-current="page">Checkout</li>
              </ol>
            </nav>
            <h4 class="mb-3">Billing Information</h4>

            <form @submit.prevent="submitAddress">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control text-muted" v-model="auth.user.name" id="name" readonly>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control text-muted" v-model="auth.user.email" id="email" readonly>
              </div>

              <div class="mb-3 mt-3">
                <label for="mobile" class="form-label">Mobile Number</label>
                <input type="text" class="form-control text-muted" v-model="auth.user.phone_no" id="mobile" readonly>
              </div>

              <div v-if="hasSavedAddress && !editingAddress" class="mb-3">
                <label for="fullAddress" class="form-label">Full Address</label>
                <input type="text" class="form-control" :value="fullAddress" id="fullAddress" readonly>
                <button type="button" class="btn btn-link p-0 mt-2" @click="editingAddress = true">Edit Address</button>
              </div>

              <div v-else>
                <div class="mb-3">
                  <label for="street_no" class="form-label">Street No</label>
                  <input type="text" class="form-control" v-model="address.street_no" id="street_no" required>
                </div>

                <div class="mb-3">
                  <label for="city" class="form-label">City</label>
                  <select class="form-select" v-model="address.city" id="city" required @change="updateBarangays">
                    <option value="" disabled>Select City</option>
                    <option v-for="city in Object.keys(cityBarangays)" :key="city" :value="city">{{ city }}</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="brgy" class="form-label">Barangay</label>
                  <select class="form-select" v-model="address.brgy" id="brgy" required :disabled="!address.city">
                    <option value="" disabled>Select Barangay</option>
                    <option v-for="barangay in filteredBarangays" :key="barangay" :value="barangay">{{ barangay }}</option>
                  </select>
                </div>

                <!-- <div class="mb-3">
                  <label for="region" class="form-label">Region</label>
                  <select class="form-select" v-model="address.region" id="region" required>
                    <option value="" disabled>Select Region</option>
                    <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                  </select>
                </div> -->

                <div class="d-flex gap-2">
                  <button type="button" class="btn btn-primary w-50" @click="saveEditedAddress">Save</button>
                  <button type="button" class="btn btn-secondary w-50" @click="cancelEdit">Cancel</button>
                </div>

              </div>

              <div class="my-3">
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

        <div class="col-md-5">
          <OrderSummary @place-order="submitOrder">
            <template #button="{ placeOrder }">
              <button
                class="btn btn-primary w-100"
                @click="placeOrder"
                :disabled="editingAddress || cartIsEmpty || !hasSavedAddress || !auth.user.phone_no"
              >
                Place Order
              </button>
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
  components: {
    Navbar,
    Footer,
    OrderSummary,
  },
  data() {
    return {
      showGcash: false,
      paymentMethod: "cod",
      address: {
        street_no: '',
        brgy: '',
        city: 'Pasig City',
        region: 'NCR'
      },
      editingAddress: false,
      addressSaved: false,
      cityBarangays: {
        "Pasig City": [ "Bagong Ilog", "Bagong Katipunan", "Bambang", "Buting", "Caniogan", "Kalawaan", "Kapasigan",
                      "Kapitolyo", "Malinao", "Oranbo", "Palatiw", "Pineda", "Sagad", "San Antonio", "San Joaquin", "San Jose",
                      "San Nicolas (Poblacion)", "San Miguel", "Santa Cruz", "Santa Rosa", "Santo Tomas", "Sumilang", "Ugong",
                      "Dela Paz", "Manggahan", "Maybunga", "Pinagbuhatan", "Rosario", "Santa Lucia", "Santolan"
                      ],
        // "Manila": [],
        // "Quezon City": [],
      },
      regions: ["NCR"]
    };
  },
  computed: {
    hasSavedAddress() {
      return this.addressSaved;
    },
    fullAddress() {
      return `${this.address.street_no}, ${this.address.brgy}, ${this.address.city}`;
    },
    filteredBarangays() {
      return this.cityBarangays[this.address.city] || [];
    },
    cartIsEmpty() {
      return this.cartStore.cart.items.length === 0;
    }
  },
  created() {
    this.auth = useAuthStore();
    this.cartStore = useCartStore();
    this.fetchUserAddress();
  },
  methods: {
    async fetchUserAddress() {
      if (this.auth.user._id) {
        try {
          const { data } = await axios.get(`/api/addresses/user/${this.auth.user._id}`);
          if (data.success) {
            this.address = data.address;
            this.addressSaved = true;
          }
        } catch (err) {
          console.error('Error fetching address:', err);
        }
      }
    },
    async saveEditedAddress() {
      try {
        const { street_no, brgy, city, region } = this.address;
        const response = await axios.post('/api/addresses', {
          userId: this.auth.user._id,
          street_no,
          brgy,
          city,
          region
        });
        if (response.data.success) {
          alert('Address updated successfully!');
          this.editingAddress = false;
          this.addressSaved = true;
        }
      } catch (err) {
        console.error('Error updating address:', err);
        alert('Failed to update address.');
      }
    },
    cancelEdit() {
      this.fetchUserAddress();
      this.editingAddress = false;
    },
    updateBarangays() {
      this.address.brgy = '';
    },
    async submitOrder() {
      if (this.editingAddress || this.cartIsEmpty || !this.hasSavedAddress || !this.auth.user.phone_no) {
          alert('Please complete your address and ensure your cart is not empty.');
          return;
        }

      try {
        const cartStore = useCartStore();
        const auth = this.auth;

        const response = await axios.post('/api/orders', {
          orderItems: cartStore.cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            gallonType: item.gallonType || 'new',
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
  }
};
</script>

<style scoped>
.breadcrumb-item a {
  text-decoration: none;
  color: #007bff;
}
select {

  cursor: pointer;
}
select:hover {
  background-color: #f8f9fa;
}
.form-label::before {
  content: "*";
  color: red;
  float: right;
}
</style>
