  <template>
  <div class="layout bg">
    <Sidebar />
    <div class="main-content">
      <AdminNavbar class="nav" />
      <div class="banner">
        <div class="content ">
              <div class="inner-content">
                <router-view></router-view>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Sidebar from "@/components/AdminSidebar.vue";
import AdminNavbar from '@/components/AdminNavbar.vue';
export default {
  name: "Dashboard",
  components: {
    Sidebar,
    AdminNavbar
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
.layout {
  display: flex;
  height: 100vh;
  width: 100vw; 
  overflow: hidden;
}

.banner {
  background-color: #0099ff;
  height: 300px; /* Adjust height */
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
}

.content {
  flex: 1; /* Takes remaining space */
  overflow-y: auto; /* Allows scrolling */
  padding: 20px;
  margin-left: 250px;
}

.inner-content {
  padding: 50px;
  width: 100%;
}
</style>