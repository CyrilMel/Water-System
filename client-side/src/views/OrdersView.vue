<template>
  <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Orders</h2>
    </div>

    <div class="table-card">
      <div class="city-selection mb-1">
        <label for="city" class="form-label mx-3 fw-bold">Select City</label>
        <select id="city" v-model="selectedCity" @change="filterBarangays" class="custom-dropdown refined-dropdown">
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>

      <div class="table-responsive table-sm">
        <div v-if="filteredBarangays.length" class="barangays-list">
          <h2>Barangays in {{ selectedCity }}</h2>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Barangay</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="barangay in filteredBarangays"
                :key="barangay.name"
                @click="selectBarangay(barangay)"
                class="clickable-row"
              >
                <td>{{ barangay.name }}</td>
                <td>{{ barangay.orders.length }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="selectedBarangay" class="orders-list">
        <div class="table-responsive table-sm">
          <h2>Orders for {{ selectedBarangay.name }}</h2>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Order Details</th>
                <th>Address</th>
                <th>Payment Method</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in selectedBarangay.orders" :key="order._id" class="clickable-row" @click="goToOrder(order.orderId)">
                <td>{{ order.orderId }}</td>
                <td>{{ order.client }}</td>
                <td>{{ order.details }}</td>
                <td>
                  <span>{{ formatTruncatedAddress(order.address) }}</span>
                </td>
                <td>{{ order.paymentMethod.toUpperCase() }}</td>
                <td>₱{{ formatPrice(order.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import { formatPrice } from '@/utils/priceFormat';
export default {
  data() {
    return {
      orders: [],
      cities: [],
      selectedCity: '',
      barangays: [],
      filteredBarangays: [],
      selectedBarangay: null,
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('/api/orders'); // adjust URL if needed
        this.orders = response.data.orders;

        this.extractCitiesAndBarangays();
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    extractCitiesAndBarangays() {
      const barangayMap = {};

      this.orders.forEach(order => {
          const { city, brgy, street_no } = order.user.address_id;
          if (!barangayMap[city]) {
            barangayMap[city] = {};
          }

          if (!barangayMap[city][brgy]) {
            barangayMap[city][brgy] = [];
          }

          const orderDetails = order.orderItems.map(item => {
            return `${item.quantity} gallon(s) - ₱${parseFloat(item.price.$numberDecimal)} (${item.productId.container_type})`;
          }).join(', ');

          barangayMap[city][brgy].push({
            _id: order._id, // MongoDB _id
            orderId: order.orderId, // Your ORD-xxxxxxx code
            client: order.user.name,
            details: orderDetails, // all order items combined
            date: order.createdAt,
            address: `${street_no}, ${brgy}, ${city}`,
            paymentMethod: order.paymentMethod,
            status: order.status,
            total: order.total,
          });
      });

      this.cities = Object.keys(barangayMap);
      this.barangays = [];

      this.cities.forEach(city => {
        Object.keys(barangayMap[city]).forEach(brgy => {
          this.barangays.push({
            city,
            name: brgy,
            orders: barangayMap[city][brgy],
          });
        });
      });

      // default selected city
      if (this.cities.length) {
        this.selectedCity = this.cities[0];
        this.filterBarangays();
      }
    },
    goToOrder(orderId) {
      this.$router.push(`/orders/${orderId}`);
    },
    filterBarangays() {
      this.filteredBarangays = this.barangays.filter(b => b.city === this.selectedCity);
      this.selectedBarangay = null;
    },
    selectBarangay(barangay) {
      this.selectedBarangay = barangay;
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
    },
    formatPrice(price) {
      return formatPrice(price);
    },
    formatTruncatedAddress(address) {
      const addressParts = address.split(',');
      const streetNo = addressParts[0].trim();
      const otherParts = addressParts.slice(1).join(', ');

      const truncatedStreetNo = streetNo.length > 15 ? streetNo.substring(0, 15) + '...' : streetNo;

      return `${truncatedStreetNo}, ${otherParts}`;
    }
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.custom-dropdown {
  width: 250px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
}

.refined-dropdown:hover, .refined-dropdown:focus {
  background: #ffffff;
  box-shadow: 2px 6px 8px rgba(0, 0, 0, 0.15);
}

.barangays-list, .orders-list {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
}

.orders-list {
  margin-top: 20px;
}

.clickable-row {
  cursor: pointer;
}
</style>
