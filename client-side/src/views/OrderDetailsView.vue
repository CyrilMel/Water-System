<template>
  <div class="page-container">
      <div class="table-card p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="fw-bold text-primary">Order Details: {{ order.orderId }}</h4>
          <span class="bg-primary text-white border rounded-2 text-uppercase px-3 py-2 fw-bold">{{ order.status }}</span>
        </div>

      <div v-if="loading">Loading...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
        <div v-else>
          <div class="mb-4">
            <div class="d-flex align-items-center mb-2">
              <i class="fa-solid fa-calendar-days me-2 text-primary"></i>
              <strong>{{ formatDate(order.createdAt) }}</strong>
            </div>
            <div class="d-flex align-items-center mb-2">
              <i class="fa-solid fa-user me-2 text-primary"></i>
              <span><strong>Customer:</strong> {{ order.user.name }}</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              <i class="fa-solid fa-phone me-2 text-primary"></i>
              <span><strong>Phone:</strong> {{ order.user.phone_no }}</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              <i class="fa-solid fa-location-dot me-2 text-primary"></i>
              <span><strong>Address:</strong> {{ order.user.address_id.street_no }}, {{order.user.address_id.brgy}}, {{ order.user.address_id.city }}</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              <i class="fa-solid fa-wallet me-2 text-primary
              
              "></i>
              <span><strong>Payment Method:</strong> {{ order.paymentMethod.toUpperCase() }}</span>
            </div>
          </div>

          <h5 class="fw-bold mb-3">Order Items</h5>
          <div class="mb-4">
            <div v-for="item in order.orderItems" :key="item._id" class="d-flex align-items-start border rounded mb-3 p-3">
              <img :src="item.productId.product_image" alt="Product Image" class="me-3 rounded" style="width: 60px; height: 80px; object-fit: contain;" />
              <div>
                <p class="mb-1 fw-semibold">{{ item.productId.product_name }}</p>
                <p class="mb-1 text-muted">{{ item.productId.container_type }} - {{ item.gallonType.toUpperCase() }} gallon(s)</p>
                <p class="mb-1 text-muted">{{ item.quantity }} quantity</p>
                <p class="fw-bold ">₱{{ formatPrice(item.price.$numberDecimal) }}</p>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column">
            <div class="bg-light p-3 rounded mb-4">
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-secondary fw-semibold">Container Reuse Discount</span>
                <h4 class="mb-0 text-muted fs-5">-₱{{ formatPrice(reuseDiscount) }}</h4>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="text-secondary fw-bold">Total</span>
                <h4 class="mb-0 text-primary fw-bold">₱{{ formatPrice(order.total) }}</h4>
              </div>
            </div>
          </div>
          <div class="row g-2">
            <div class="col-6">
              <button 
                type="button" 
                class="btn btn-outline-success w-100 py-2"
                @click="updateOrderStatus('Delivered')" 
                :disabled="order.status !== 'In-transit'"
              >
                <i class="fa-solid fa-truck-check me-2"></i>Mark as Delivered
              </button>
            </div>
            <div class="col-6">
              <button 
                type="button" 
                class="btn btn-primary w-100 py-2" 
                @click="updateOrderStatus('In-transit')" 
                :disabled="order.status !== 'Pending'"
              >
                <i class="fa-solid fa-rotate me-2"></i>Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
  
<script>
import axios from '@/axios';
import { formatPrice } from '@/utils/priceFormat';
  
  export default {
      props: ['orderId'],
      data() {
        return {
          order: {},
          loading: true,
          errorMessage: '',
        };
      },
      mounted() {
          this.fetchOrderDetails();
      },
      computed: {
        reuseDiscount() {
          return this.order.orderItems?.reduce((total, item) => {
          if (item.gallonType?.toLowerCase() === 'refill') {
            return total + (40 * item.quantity);
          }
          return total;
        }, 0) || 0;
        }
      },

      methods: {
      async fetchOrderDetails() {
          try {
              const response = await axios.get(`/api/orders/${this.orderId}`);
              this.order = response.data.order;
              this.loading = false;
          } catch (error) {
              this.loading = false;
              this.errorMessage = 'Failed to load order details';
          }
      },
      formatPrice(price) {
          return formatPrice(price);
      },
      formatDate(date) {
          const d = new Date(date);
          return d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
      },
      async updateOrderStatus(newStatus) {
        try {
          const response = await axios.patch(`/api/orders/${this.order._id}/status`, {
            status: newStatus,
          });
          if (response.data.success) {
            this.order = response.data.order;
            this.fetchOrderDetails()
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: `Order status updated to "${newStatus}"`,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          } else {
            this.errorMessage = 'Failed to update order status';
          }
        } catch (error) {
          console.log("Error updating order status:", error.message);
          this.errorMessage = 'Server Error';
        }
      }
      },
  };
</script>

<style scoped>
/* Customize the appearance of disabled buttons */
button:disabled {
    border: none; /* Remove the border */
    background-color: #f5f5f5; /* You can also change the background color */
    color: #aaa; /* Change text color to show it's disabled */
    cursor: not-allowed; /* Make the cursor show "not-allowed" to indicate it's disabled */
}

</style>

  