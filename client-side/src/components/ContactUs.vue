<template>
  <section class="contact-section" ref="contactSection">
      <div class="background-container">
          <img src="../assets/images/contact.jpg" alt="Background" class="background-image" />
          <svg class="wave wave-top" viewBox="0 0 1440 100">
              <path fill="white" fill-opacity="1" d="M0,50L60,55C120,60,240,70,360,75C480,80,600,80,720,75C840,70,960,60,1080,55C1200,50,1320,55,1380,57L1440,60V0H0Z"></path>
          </svg>
      </div>

      <div class="content">
          <p class="contact-subtitle">We're here to assist you. Reach out via phone, email, or visit us.</p>
          <div class="contact-cards">
              <div class="contact-card">
                  <i class="fas fa-phone"></i>
                  <h3>Phone</h3>
                  <p>+1 234 567 890</p>
              </div>
              <div class="contact-card">
                  <i class="fas fa-envelope"></i>
                  <h3>Email</h3>
                  <p>contact@yourcompany.com</p>
              </div>
              <div class="contact-card">
                  <i class="fas fa-map-marker-alt"></i>
                  <h3>Visit Us</h3>
                  <p>123 Water St, Pateros</p>
              </div>
          </div>
        
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvpbJbBNczKCSLmdwlCKQVCWGZzRRDzFJnmLqBrgWlvQhxssZWJzmKJLCCwPKGbbmcTGkg" target="_blank" rel="noopener noreferrer"> 
          <button class="contact-button">Email Us</button>
        </a> 
      </div>
  </section>
</template>

<script>
export default {
  mounted() {
      window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
      handleScroll() {
          const section = this.$refs.contactSection;
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
              section.classList.add("visible");
          }
      }
  }
};
</script>

<style scoped>

</style>
