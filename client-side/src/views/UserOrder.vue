<template>
<div>
  <Navbar class="bg">
    <template v-slot:modalNavLink></template>
  </Navbar>

  <div>
    <ChatBot></ChatBot>
  </div>

  <div class="container mb-4">
    <div class="row">
      <!-- User Profile Section -->
      <div class="col-md-4 user-profile">
        <div class="text-center fs-3 fw-bold"><p>User Profile</p></div>
        <div class="profile-card">
          <img src="../assets/images/blank-profile.png" alt="User" class="profile-img" />
          <h5 class="user-name">{{ auth.user.name }}</h5>
          <p class="user-email">{{ auth.user.email }}</p>
          <p class="user-address">{{ auth.user.address_id || "No Address Provided" }}</p>
        </div>
      </div>

      <!-- Order Tabs -->
      <div class="col-md-8">
        <ul class="nav nav-tabs custom-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#pending">My Orders</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#history">History</a>
          </li>
        </ul>

        <div class="tab-content mt-3">
          <!-- Pending Orders -->
          <div id="pending" class="tab-pane fade show active">
            <div v-if="pendingOrders.length === 0" class="text-center text-muted py-4">
              No orders yet.
            </div>
            <div v-else>
              <div class="order-card" v-for="order in pendingOrders" :key="order.id">
                <div class="order-header">
                  <span class="order-date">{{ order.date }}</span>
                  <span class="order-status pending">{{ order.status }}</span>
                </div>
                <div class="order-body">
                  <img :src="order.image" alt="Product" class="order-img" />
                  <div class="order-info">
                    <p class="order-name">{{ order.name }}</p>
                    <p class="order-id">Order ID: {{ order.id }}</p>
                    <p class="order-qty">QTY: {{ order.quantity }}</p>
                    <p class="order-price">Total: <strong>P {{ getTotal(order) }}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Completed Orders -->
          <div id="history" class="tab-pane fade">
            <div v-if="orderHistory.length === 0" class="text-center text-muted py-4">
              No completed orders yet.
            </div>
            <div v-else>
              <div class="order-card" v-for="order in orderHistory" :key="order.id">
                <div class="order-header">
                  <span class="order-date">{{ order.date }}</span>
                  <span class="order-status completed">{{ order.status }}</span>
                </div>
                <div class="order-body">
                  <img :src="order.image" alt="Product" class="order-img" />
                  <div class="order-info">
                    <p class="order-name">{{ order.name }}</p>
                    <p class="order-id">Order ID: {{ order.id }}</p>
                    <p class="order-qty">QTY: {{ order.quantity }}</p>
                    <p class="order-price">Total: <strong>P {{ getTotal(order) }}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</div>
</template>

<script>
import ChatBot from "@/components/ChatBot.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "@/axios";

export default {
  data() {
    return {
      pendingOrders: [],
      orderHistory: [],
    };
  },
  created() {
    this.auth = useAuthStore();
    this.fetchUserOrders();
  },
  methods: {
    async fetchUserOrders() {
      try {
        const userId = this.auth.user._id;
        const { data } = await axios.get(`/api/orders/user/${userId}`);

        const pending = [];
        const history = [];

        data.orders.forEach(order => {
          order.orderItems.forEach(item => {
            const formattedOrder = {
              id: order.orderId,
              name: item.productId.product_name,
              quantity: item.quantity,
              price: parseFloat(item.price?.$numberDecimal || item.price),
              image: item.productId.product_image,
              status: order.status,
              date: new Date(order.createdAt).toLocaleDateString(),
            };

            if (order.status.toLowerCase() === 'completed') {
              history.push(formattedOrder);
            } else {
              pending.push(formattedOrder);
            }
          });
        });

        this.pendingOrders = pending;
        this.orderHistory = history;
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    },
    getTotal(order) {
      return (order.price * order.quantity).toFixed(2);
    }
  },
  components: {
    ChatBot,
    Footer,
    Navbar
  }
};
</script>

<style scoped>
.bg {
  background: linear-gradient(135deg, #ffffff, #4aa3df);
  opacity: 85%;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}
.container {
  max-width: 900px;
  margin-top: 150px;
}
.custom-tabs .nav-link {
  color: #fff;
  background: #4aa3df;
  margin-right: 5px;
  border-radius: 10px 10px 0 0;
  padding: 10px 20px;
}
.custom-tabs .nav-link.active {
  background: #007bff;
}
.profile-card {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.order-card {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}
.order-card:hover {
  transform: scale(1.02);
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}
.order-status {
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
  text-transform: capitalize;
}
.pending {
  background: #ffc107;
  color: white;
}
.completed {
  background: #28a745;
  color: white;
}
.order-body {
  display: flex;
  align-items: center;
}
.order-img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 15px;
}
.order-info p {
  margin: 0;
  font-size: 14px;
}
.text-muted {
  font-size: 16px;
  color: #888 !important;
}
</style>
