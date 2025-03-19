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