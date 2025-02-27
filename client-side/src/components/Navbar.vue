<template>
  <nav :class="{ 'scrolled': isScrolled }" class="navbar">
    <div class="top-right-account">
      <router-link to="/login" class="account-btn">
        <i class="fas fa-user"></i> Account
      </router-link>
    </div>
    <div class="top-right-cart">
        <router-link to="/login" class="account-btn">
        <i class="fas fa-shopping-cart"></i> Cart
      </router-link>
      </div>

    <div class="nav-content">
      <div class="logo">
        <img src="../assets/images/logo.png" alt="Logo" class="logo-img" />
      </div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Get Water Delivery</a></li>
      </ul>
   
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return { isScrolled: false };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 30px 5px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.top-right-account {
  position: absolute;
  top: 5px;
  right: 20px;
}
.top-right-cart{
  position: absolute;
  right: 100px;
  top: 5px;


}
.account-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Poppins', sans-serif;
}
.account-btn:hover {
  color: blue;
  font-weight: 300;
}
.nav-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
}
.logo-img {
  height: 60px;
}
.nav-links {
  margin-top: 20px;
  margin-left: 40%;
  list-style: none;
  display: flex;
  gap: 30px;
  align-items: center;
  font-weight: 700;
}
.nav-links li a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  transition: color 0.3s, font-weight 0.3s;
  font-family: 'Poppins', sans-serif;
}
.nav-links li a:hover {
  color: blue;
  font-weight: 700;
}
.delivery-btn {
  background: blue;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  font-family: 'Poppins', sans-serif;
}
.delivery-btn:hover {
  background: darkblue;
}

/* Transparent when on top */
.navbar {
  background: transparent;
  color: black;
}
/* Change to white with shadow on scroll */
.navbar.scrolled {
  background: linear-gradient(135deg, #ffffff, #4aa3df);
  opacity: 85%;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}
.navbar.scrolled .nav-links li a {
  color: white;
}
.navbar.scrolled .account-btn {
  color: white;
}
.navbar.scrolled .nav-links li a:hover{
  color: blue;
  font-weight: 700;
} 
.navbar.scrolled .account-btn:hover{
  color: blue;
  font-weight: 300;
} 
</style>
