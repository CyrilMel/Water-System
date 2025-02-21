<template>
  <div class="d-flex bg">
    <Sidebar />
    <div
      class="content-container flex-grow-1 d-flex flex-column justify-content-center align-items-center"
    >
      <div class="content p-4 w-100 ">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
  <script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
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
.bg {
  background-color: #f5f5f5;
}
.sidebar {
  width: 270px;
  height: 100vh;
  border-bottom-right-radius: 20px;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
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
.logo-img {
  width: 120px;
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
.nav-item {
  position: relative;
  display: flex;
  flex-direction: column;
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
@media (max-width: 768px) {
  .sidebar {
    width: 220px;
  }
}
</style>
  