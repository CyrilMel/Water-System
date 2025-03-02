<template>
  <div class="logo-marquee">
    <div class="logo-track">
      <img v-for="n in 10" :key="n" src="../assets/images/logo.png" alt="Logo" class="dark-logo" />
      <img v-for="n in 10" :key="'copy-' + n" src="../assets/images/logo.png" alt="Logo" class="dark-logo" />
    </div>
  </div>
  <footer class="footer-container">
    <div class="footer-info">
      <p>Our mineral water is sourced from the purest springs, undergoing rigorous filtration to ensure the highest quality. Stay hydrated with crisp, refreshing water that promotes a healthier lifestyle.</p>
    </div>
    <div class="footer-content">
      <div class="footer-links">
        <a href="#about" @click.prevent="scrollTo('about', 100)">About Us</a>
        <a href="#contact" @click.prevent="scrollTo('contact', 10)">Contact Us</a>
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvpbJbBNczKCSLmdwlCKQVCWGZzRRDzFJnmLqBrgWlvQhxssZWJzmKJLCCwPKGbbmcTGkg" target="_blank" rel="noopener noreferrer">Email Us</a>
      </div>
      <div class="footer-socials">
        <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    scrollTo(section, offset) {
      this.$nextTick(() => {
        const target = document.getElementById(section);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: "smooth",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.footer-container {
  background: #0a3d62;
  color: white;
  padding: 40px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.logo-marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
  background: linear-gradient(to right, #0a3d62, #1e6091);
  padding: 10px 0;
  white-space: nowrap;
}

.logo-track {
  display: flex;
  width: max-content;
  animation: marquee 10s linear infinite;
}

.dark-logo {
  filter: brightness(0.2);
  width: 100px;
  margin: 0 20px;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.footer-info {
  max-width: 600px;
  margin: 0 auto 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #cce7ff;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
}

.footer-links a, .footer-socials a {
  color: white;
  text-decoration: none;
  margin: 0 20px;
  transition: color 0.3s ease;
  font-size: 18px;
}

.footer-links a:hover, .footer-socials a:hover {
  color: #4fc1e9;
}

.social-icon {
  font-size: 24px;
}

.footer-container::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  background: linear-gradient(to right, #4fc1e9, #1e6091);
  bottom: 100%;
  animation: wave 2s infinite linear;
}

@keyframes wave {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(50%); }
}
</style>
