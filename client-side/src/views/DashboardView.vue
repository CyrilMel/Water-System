<template>
  
    <div class="content-container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <!-- Landing image container with combined zoom, tilt, and pulse animation -->
      <div class="landing-page">
        <img src="../assets/images/design.png" alt="Landing" class="landing-image" />
      </div>
      
      <!-- Water animation container with extra swell animation -->
      <div class="water-animation">
        <div class="bubbles">
          <div class="bubble bubble1"></div>
          <div class="bubble bubble2"></div>
          <div class="bubble bubble3"></div>
          <div class="bubble bubble4"></div>
          <div class="bubble bubble5"></div>
          <div class="bubble bubble6"></div>
        </div>
      </div>
    </div>      
</template>

<script>
export default {
  name: "Dashboard",
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
    }
  }
};
</script>

<style scoped>
/* Sidebar styles with off-white background */
.sidebar {
  width: 270px;
  height: 100vh;
  background-color: #f8f8f8;
  border-bottom-right-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
}

/* Enlarge the logo */
.logo-img {
  width: 150px; /* Increased size */
  height: auto;
  transition: transform 0.3s ease;
}

/* Sidebar link styles with larger text */
.nav-link {
  font-size: 1.2rem;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  transition: transform 0.3s, text-shadow 0.3s, background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sub-link {
  font-size: 1.1rem;
}
.nav-link:hover {
  background-color: #6c63ff;
  color: white;
  transform: scale(1.05);
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  animation: wiggle 0.5s ease-in-out;
}
@keyframes wiggle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }
}

.logout-container {
  text-align: center;
  padding: 10px;
}
.logout-link {
  text-decoration: none;
  font-size: 1.2rem;
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
.dropdown-btn {
  background: none;
  border: none;
  color: #333;
  font-size: 1.2rem;
  width: 100%;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  transition: transform 0.3s, text-shadow 0.3s, background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.dropdown-btn:hover {
  background-color: #6c63ff;
  color: white;
  transform: scale(1.05);
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  animation: wiggle 0.5s ease-in-out;
}
.back-btn {
  background: none;
  border: none;
  color: #333;
  font-size: 1.2rem;
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

/* Landing image container with combined zoom, tilt, and pulse animation */
.landing-page {
  position: relative;
  width: 90%;
  max-width: 800px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 0;
  animation: zoomAndTilt 6s ease-in-out infinite;
}
.landing-image {
  width: 100%;
  height: auto;
  display: block;
}
@keyframes zoomAndTilt {
  0% {
    transform: scale(1) rotate(-1deg);
    opacity: 0.95;
  }
  50% {
    transform: scale(1.05) rotate(1deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(-1deg);
    opacity: 0.95;
  }
}

/* Water animation container with additional swell animation */
.water-animation {
  position: relative;
  width: 90%;
  max-width: 800px;
  height: 70px;
  margin-bottom: 20px;
  overflow: hidden;
  animation: swell 6s ease-in-out infinite;
}
@keyframes swell {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.05); }
}

/* Water ripple overlay with shine effect */
.water-animation::after {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'><path fill='%236c63ff' fill-opacity='0.15' d='M0,100 C150,150 350,50 500,100 C650,150 850,50 1000,100 L1000,200 L0,200 Z'/></svg>") repeat-x;
  background-size: 50% 100%;
  animation: waterRipple 6s linear infinite, shine 6s linear infinite;
}
@keyframes waterRipple {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
@keyframes shine {
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.1);
  }
  100% {
    filter: brightness(1);
  }
}

/* Bubbles animation with added horizontal drift and extra rotation */
.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.bubble {
  position: absolute;
  bottom: -20px;
  background: rgba(108, 99, 255, 0.3);
  border-radius: 50%;
  animation: rise 4s linear infinite;
}
.bubble1 {
  width: 12px;
  height: 12px;
  left: 15%;
  animation-delay: 0s;
}
.bubble2 {
  width: 18px;
  height: 18px;
  left: 50%;
  animation-delay: 1s;
}
.bubble3 {
  width: 14px;
  height: 14px;
  left: 80%;
  animation-delay: 0.5s;
}
.bubble4 {
  width: 16px;
  height: 16px;
  left: 30%;
  animation-delay: 0.7s;
}
.bubble5 {
  width: 10px;
  height: 10px;
  left: 65%;
  animation-delay: 1.2s;
}
.bubble6 {
  width: 20px;
  height: 20px;
  left: 40%;
  animation-delay: 1.5s;
}
@keyframes rise {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(3px, -30px) rotate(5deg) scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: translate(0, -60px) rotate(0deg) scale(1.2);
    opacity: 0;
  }
}
</style>
