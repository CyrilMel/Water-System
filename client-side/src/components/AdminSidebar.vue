<template>
  <div class="sidebar position-fixed bg-light d-flex z-1 flex-column justify-content-between text-dark p-4">
    <div>
      <div class="text-center logo position-absolute">
        <router-link to="/overview">
          <img src="../assets/images/logo.png" alt="Logo" class="logo-img" />
        </router-link>
      </div>
      <nav class="nav flex-column mt-5">
        <router-link to="/overview" class="nav-link" :class="{ 'active-link': $route.path === '/overview' }">
          <i class="fas fa-chart-bar"></i> Overview
        </router-link>
          <div class="d-flex position-relative flex-column">
            <button class="nav-link dropdown-btn d-flex justify-content-between align-items-center"  @click="toggleOrders">
              <span><i class="fas fa-box"></i> Orders</span>
              <i :class="showOrders ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
            </button>
            <div v-if="showOrders" class="nested-menu">
              <router-link to="/orders/area" class="nav-link sub-link" :class="{ 'active-link': $route.path === '/orders/area' }">
                <i class="fas fa-user"></i> Area
              </router-link>
              <router-link to="/orders/client" class="nav-link sub-link" :class="{ 'active-link': $route.path === '/orders/client' }">
                <i class="fas fa-users"></i> Client
              </router-link>
            </div>
          </div>
        <router-link to="/status" class="nav-link" :class="{ 'active-link': $route.path === '/status' }">
          <i class="fas fa-info-circle"></i> Status
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin Dashboard",
  data() {
    return {
      showOrders: false,
      sidebarVisible: true,
    };
  },
  methods: {
    toggleOrders() {
      this.showOrders = !this.showOrders;
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>

<style scoped>
.sidebar {
  left: 1.2%;
  top: 15px;
  width: 250px;
  height: 96vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  border-radius: 15px 15px 0 15px;
}
.nav-link {
  color: #333;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-link:hover {
  background-color: #6c63ff;
  color: white;
}
.logo{
  top: 2%;
  left: 10%;
}
.logo-img {
  width: 100px;
  height: auto;
}
.logout-container {
  text-align: center;
  padding: 10px;
}
.logout-link {
  text-decoration: none;
  font-size: 18px;
  color: #333;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.logout-link:hover {
  color: #ff4d4d;
}
.nested-menu {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-top: 5px;
}
.sub-link {
  font-size: 14px;
}
.dropdown-btn {
  background: none;
  border: none;
  color: #333;
  width: 100%;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.dropdown-btn:hover {
  background-color: #6c63ff;
  color: white;
}
.back-btn {
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s;
}
.back-btn:hover {
  color: #6c63ff;
}
.active-link {
  background-color: #6c63ff;
  color: white;
}

@media (max-width: 768px) {
  .sidebar {
    width: 220px;
  }
}
</style>