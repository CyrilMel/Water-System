<template>
  <nav :class="{ 'scrolled': isScrolled }" class="navbar">
    <div class="top-right">
      <router-link to="/myaccount" class="account-btn">
        <i class="fas fa-user"></i> Account
      </router-link>
      <router-link :to="{ name: 'cart' }" class="account-btn">
        <i class="fas fa-shopping-cart"></i> Cart
      </router-link>
    </div>
    
    <div class="nav-content mt-3">
      <div class="logo">
        <img src="../assets/images/logo.png" alt="Logo" class="logo-img" />
      </div>
      <button class="menu-toggle" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
      <slot name="modalNavLink">
        <div :class="{ 'nav-links-wrapper': true, 'active': isMenuOpen }">
          <button v-if="isMobile" class="menu-close" @click="toggleMenu">
            <i class="fas fa-times"></i>
          </button>
          <div class="mobile-logo" v-if="isMobile">
            <img src="../assets/images/logo.png" alt="Logo" class="logo-img" />
          </div>
          <ul class="nav-links">
            <li><router-link :to="{ name: 'home' }"  @click.prevent="scrollTo('home', 0) ">Home</router-link></li>
            <li><router-link :to="{ name: 'home'}"  @click.prevent="scrollTo('about', 100)">About</router-link></li>
            <li><router-link :to="{ name: 'home'}" @click.prevent="scrollTo('contact', 10)">Contact Us</router-link></li>
            <li><router-link :to="{ name: 'home'}" @click.prevent="scrollTo('delivery', 100)">Get Water Delivery</router-link></li>
          </ul>
        </div>
      </slot>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return { 
      isScrolled: false,
      isMenuOpen: false,
      isMobile: window.innerWidth <= 768
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    scrollTo(section, offset) {
      this.$nextTick(() => {
        const target = document.getElementById(section);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth",
          });
        }
        this.isMenuOpen = false;
      });
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}
.top-right {
  display: flex;
  gap: 15px;
  position: absolute;
  top: 5px;
  right: 20px;
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
  height: 50px;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
  align-items: center;
  font-weight: 700;
}
.nav-links li a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  transition: color 0.3s, font-weight 0.3s;
  font-family: 'Poppins', sans-serif;
}
.nav-links li a:hover {
  color: blue;
  font-weight: 700;
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
}
.mobile-logo{
  margin-left:40% ;
  margin-bottom: 5%;
}
/* Responsive Design */
@media (max-width: 768px) {
  .nav-links-wrapper {
    display: none;
    flex-direction: column;
  background: linear-gradient(135deg, #ffffff, #4aa3df);

    color: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    justify-content: center;
    padding: 15px;
    z-index: 1100;
  }
  .nav-links-wrapper.active {
    display: flex;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 15%;
    
  }
  .nav-links li a {
    color: white;
    font-size: 22px;
  }
  .menu-toggle {
    display: block;
    color: white;
  }
  .menu-close {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: white;
  }
  
}

/* Change navbar on scroll */
.navbar {
  background: transparent;
}
.navbar.scrolled {
  background: linear-gradient(135deg, #ffffff, #4aa3df);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}

.navbar.scrolled .account-btn {
  color: white;
}

@media (min-width: 769px) {
  .navbar.scrolled .nav-links li a {
    color: white;
  }
}

</style>
