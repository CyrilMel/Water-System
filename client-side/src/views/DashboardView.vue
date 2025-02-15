<template>
  <div class="d-flex">
    <div class="sidebar bg-white text-dark p-4 shadow d-flex flex-column justify-content-between">
      <div>
        <div class="text-center mb-4">
          <img src="../assets/images/logo.png" alt="Logo" class="logo-img" />
        </div>
        <nav class="nav flex-column">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/orders" class="nav-link">Orders</router-link>
          <router-link to="/status" class="nav-link">Status</router-link>
          <router-link to="/overview" class="nav-link">Overview</router-link>
        </nav>
      </div>
      <div class="logout-container">
        <router-link to="/logout" class="logout-link">
          <i class="fas fa-sign-out-alt"></i>
        </router-link>
      </div>
    </div>
    <div class="content p-4 flex-grow-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  border-bottom-right-radius: 20px;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.nav-link {
  color: #333;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
.nav-link:hover {
  background-color: #6c63ff;
  color: white;
}
.logo-img {
  width: 120px;
  height: auto;
}
.logout-container {
  text-align: center;
  padding: 10px;
}
.logout-link {
  font-size: 24px;
  color: #333;
  transition: color 0.3s;
}
.logout-link:hover {
  color: #ff4d4d;
}
</style>
