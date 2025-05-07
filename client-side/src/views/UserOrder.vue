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
            <p class="user-address flex-wrap">
              {{ userAddress ? `${userAddress.street_no}, ${userAddress.brgy}, ${userAddress.city}` : "No Address Provided" }}
            </p>
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
                    <span :class="['order-status', getStatusClass(order.status)]">{{ order.status }}</span>
                  </div>
                  <div class="order-body" v-for="item in order.items" :key="item.name">
                    <img :src="item.image" alt="Product" class="order-img" />
                    <div class="order-info">
                      <p class="order-name">{{ item.name }}, {{ item.gallonType }}</p>
                      <p class="order-id">Order ID: {{ order.id }}</p>
                      <p class="order-qty">QTY: {{ item.quantity }}</p>
                      <p class="order-price">Price: <strong>₱ {{ (item.price * item.quantity).toFixed(2) }}</strong></p>
                    </div>
                  </div>
                  <div class="mt-3 text-end">
                    Total Order: <strong>₱ {{ (order.total).toFixed(2) }}</strong>
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
                    <span :class="['order-status', getStatusClass(order.status)]">{{ order.status }}</span>
                  </div>
                  <div class="order-body" v-for="item in order.items" :key="item.name">
                    <img :src="item.image" alt="Product" class="order-img" />
                    <div class="order-info">
                      <p class="order-name">{{ item.name }}</p>
                      <p class="order-id">Order ID: {{ order.id }}</p>
                      <p class="order-qty">QTY: {{ item.quantity }}</p>
                      <p class="order-price">Price: <strong>₱ {{ (item.price * item.quantity).toFixed(2) }}</strong></p>
                    </div>
                  </div>
                  <div class="mt-3 text-end">
                    Total Order: <strong>₱ {{ (order.total).toFixed(2) }}</strong>
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
      userAddress: null,
    };
  },
  created() {
    this.auth = useAuthStore();
    if (this.auth.user) {
      this.fetchUserOrders();
      this.fetchUserAddress();
    }
  },
  methods: {
    async fetchUserOrders() {
      try {
        const userId = this.auth.user._id;
        const { data } = await axios.get(`/api/orders/user/${userId}`);

        const groupOrders = (orders, filterStatus) => {
          const grouped = {};

          orders.forEach(order => {
            const status = order.status.toLowerCase();
            if (!filterStatus.includes(status)) return;

            const date = new Date(order.createdAt).toLocaleDateString();

            if (!grouped[order.orderId]) {
              grouped[order.orderId] = {
                id: order.orderId,
                status: order.status,
                total: order.total,
                date,
                items: []
              };
            }

            order.orderItems.forEach(item => {
              grouped[order.orderId].items.push({
                name: item.productId.product_name,
                quantity: item.quantity,
                gallonType:item.gallonType,
                price: parseFloat(item.price?.$numberDecimal || item.price),
                image: item.productId.product_image
              });
            });
          });

          return Object.values(grouped);
        };

        this.pendingOrders = groupOrders(data.orders, ['pending', 'in-transit']);
        this.orderHistory = groupOrders(data.orders, ['completed', 'delivered']);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    },

    async fetchUserAddress() {
      try {
        const userId = this.auth.user._id;
        const { data } = await axios.get(`/api/addresses/user/${userId}`);
        this.userAddress = data.address;
      } catch (err) {
        console.error('Failed to fetch address:', err);
      }
    },

    getStatusClass(status) {
      const normalized = status.toLowerCase();
      if (normalized === 'pending') return 'pending';
      if (normalized === 'in-transit') return 'in-transit';
      if (normalized === 'completed') return 'completed';
      if (normalized === 'delivered') return 'delivered';
      return 'default-status';
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
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: capitalize;
}
.order-status.pending {
  background-color: #f0ad4e;
  color: white;
}
.order-status.in-transit {
  background-color: #5bc0de;
  color: white;
}
.order-status.completed,
.order-status.delivered {
  background-color: #5cb85c;
  color: white;
}
.order-body {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.order-img {
  object-fit: contain;
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
