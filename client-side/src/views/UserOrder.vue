<template>
      <Navbar class="bg">
    <template v-slot:modalNavLink>
    </template>
  </Navbar>
    <div>
      <ChatBot></ChatBot>
    </div>
    <div class="container mb-4">
      <div class="row">
        <div class="col-md-4 user-profile">
          <div class="text-center fs-3 fw-bold"><p>User Profile</p></div>
          <div class="profile-card">
            <img src="../assets/images/blank-profile.png" alt="User" class="profile-img" />
            <h5 class="user-name">{{ auth.user.name }}</h5>
            <p class="user-email">{{ auth.user.email }}</p>
            <p class="user-address">{{auth.user.address_id || "No Address Provided"}}</p>
          </div>
        </div>
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
            <div id="pending" class="tab-pane fade show active">
              <div class="order-card" v-for="order in pendingOrders" :key="order.id">
                <div class="order-header">
                  <span class="order-date">02/01/25</span>
                  <span class="order-status pending">Pending</span>
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
  
            <div id="history" class="tab-pane fade">
              <div class="order-card" v-for="order in orderHistory" :key="order.id">
                <div class="order-header">
                  <span class="order-date">01/15/25</span>
                  <span class="order-status completed">Completed</span>
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
        <Footer/>
  </template>
  
  <script>
  import ChatBot from "@/components/ChatBot.vue";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
  import { useAuthStore } from "@/stores/auth";
  
  export default {
    data() {
      return {
        pendingOrders: [
          { 
            id: "S201983443", 
            name: "Round Container New", 
            price: 150, 
            quantity: 2, 
            image: new URL("@/assets/images/test-data-image.png", import.meta.url).href 
          },
          { 
            id: "S201983443", 
            name: "Round Container Refill", 
            price: 35, 
            quantity: 1, 
            image: new URL("@/assets/images/test-data-image.png", import.meta.url).href 
          }
        ],
        orderHistory: [
          { 
            id: "S201983441", 
            name: "Round Container New", 
            price: 150, 
            quantity: 1, 
            image: new URL("@/assets/images/test-data-image.png", import.meta.url).href 
          }
        ]
      };
    },
    methods: {
      getTotal(order) {
        return order.price * order.quantity;
      }
    },
    components: {
      ChatBot,
      Footer,
      Navbar
    },
    created() {
      this.auth = useAuthStore()
    },
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
  </style>
  