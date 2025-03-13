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
          
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvpbJbBNczKCSLmdwlCKQVCWGZzRRDzFJnmLqBrgWlvQhxssZWJzmKJLCCwPKGbbmcTGkg" target="_blank" rel="noopener noreferrer"> <button class="contact-button">Email Us</button></a> 
        
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

.contact-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.contact-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
}

.wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 105%;
  z-index: 1;
}

.content {
  position: relative;
  text-align: center;
  color: white;
  max-width: 750px;
  z-index: 2;
  padding: 20px;
}

.contact-subtitle {
  font-size: 1.4rem;
  margin-bottom: 30px;
}

.contact-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.contact-card {
  background: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 9px;
  text-align: center;
  width: 280px;
  color: white;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
}

.contact-card:hover {
  transform: scale(1.06);
  background: rgba(255, 255, 255, 0.25);
}

.contact-card i {
  font-size: 2.3rem;
  margin-bottom: 12px;
  transition: transform 0.3s ease-in-out;
}

.contact-card:hover i {
  transform: scale(1.15);
}

.contact-button {
  margin-top: 30px;
  padding: 14px 35px;
  border: 2px solid white;
  background: transparent;
  color: white;
  font-size: 1.1rem;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  font-weight: 1000;

}

.contact-button:hover {
  background: white;
  color: #004cff;
}
</style>
