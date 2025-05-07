<template>
  <div class="page-container">
      <div class="d-flex justify-content-start">
        <h2 class="fw-bold">Order Details: {{ order.orderId }}</h2>
      </div>
      <div class="table-card p-3">
      <div class="order-details">
          <div v-if="loading">Loading...</div>
          <div v-else-if="errorMessage">{{ errorMessage }}</div>
          <div v-else>
              <div class="d-flex justify-content-between">
                  <p><strong>Date: </strong>{{ formatDate(order.createdAt) }}</p>
                  <p><strong>Status:</strong> {{ order.status.toUpperCase() }}</p>
              </div>
              <p><strong>Customer:</strong> {{ order.user.name }}</p>
              <p><strong>Phone:</strong> {{ order.user.phone_no }}</p>
              <p><strong>Address:</strong> {{ order.user.address_id.street_no }}, {{order.user.address_id.brgy }}, {{ order.user.address_id.city }}</p>
              <p><strong>Payment Method:</strong> {{ order.paymentMethod.toUpperCase() }}</p>
              <h4>Order Items:</h4>
              <ul>
              <li v-for="item in order.orderItems" :key="item._id">
                  {{ item.productId.product_name }} - {{ item.productId.container_type }} - {{ item.quantity }} gallon(s) - ₱{{ formatPrice(item.price.$numberDecimal) }}
              </li>
              </ul>
              <div class="col bg-secondary-field rounded-2 d-flex flex-column justify-content-center align-items-start">
                  <label class="text-secondary-gray body-3 text-light-gray">Total</label>
                  <h2 class="mb-0 mt-2">₱{{ formatPrice(order.total) }}</h2>
              </div>
          </div>
          </div>
          <div class="gap-2 d-flex justify-content-start align-items-center">
                  <div class="col">
                      <!-- Disable 'Mark as Delivered' if status is not 'In-transit' -->
                      <button 
                          type="button" 
                          class="btn btn-primary btn-lg w-100"  
                          @click="updateOrderStatus('Delivered')" 
                          :disabled="order.status !== 'In-transit'"
                      >
                          Mark as Delivered
                      </button>
                  </div>
                  <div class="col">
                      <!-- Disable 'Update Status' if status is 'In-transit' or 'Delivered' -->
                      <button 
                          type="button" 
                          class="btn bg-secondary-field text-light-gray btn-lg w-100" 
                          @click="updateOrderStatus('In-transit')" 
                          :disabled="order.status !== 'Pending'"
                      >
                          Update Status
                      </button>
                  </div>
                  <div class="col">
                      <button type="button" class="btn bg-secondary-field text-light-gray btn-lg w-100">Cancel</button>
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

  