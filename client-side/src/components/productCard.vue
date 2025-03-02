<template>
  <div ref="advertisementSection" class="advertisement-section" :class="{ 'fade-in': isVisible }">
    <div class="advertisement-text">
      <h1><span class="blue-text">Pure Mineral Water,</span> <span class="black-text">Healthy Living</span></h1>
      <p>Experience the benefits of natural mineral water, sourced and purified for your well-being.</p>
    </div>
    
    <div class="cards-container">
      <div v-for="(card, index) in cards" :key="index" 
        class="card" 
        :class="{ 'fade-in': isVisible }"
        @click="openModal(index)">
        <div class="image-container">
          <img src="../assets/images/test-data-image.png" alt="Mineral Water" class="card-image" />
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ card.title }} &rsaquo;</h3>
          <p class="card-description">{{ card.description }}</p>
        </div>
      </div>
      
      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content shadow-lg" @click.stop>
          <img src="../assets/images/test-data-image4.png" alt="Mineral Water" class="modal-image" />
          <h2>{{ selectedCard.title }}</h2>
          <p>{{ selectedCard.fullDescription }}</p>
          <button class="close-btn" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { title: "Why Choose Mineral Water?", description: "Mineral water is naturally enriched with essential minerals...", fullDescription: "Mineral water provides hydration while supplying vital nutrients like calcium and magnesium for a healthier body." },
        { title: "Our Purification Process", description: "Ensuring every drop meets the highest standards...", fullDescription: "Our advanced filtration process retains beneficial minerals while removing impurities, delivering the purest water possible." },
        { title: "Sustainability Matters", description: "Supporting a healthier planet with eco-friendly practices...", fullDescription: "Our commitment to sustainability includes responsible sourcing and environmentally friendly packaging solutions." }
      ],
      showModal: false,
      selectedCard: {},
      isVisible: false
    };
  },
  methods: {
    openModal(index) {
      this.selectedCard = this.cards[index];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleScroll() {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            observer.disconnect(); // Stop observing once visible
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(this.$refs.advertisementSection);
    }
  },
  mounted() {
    this.handleScroll();
  }
};
</script>

<style scoped>
/* Section Styling */
.advertisement-section {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

/* Make it visible when scrolled */
.fade-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Text Styling */
.advertisement-text h1 {
  font-size: 2rem;
  font-weight: 800;
}
.advertisement-text p {
  font-size: 1rem;
  font-weight: 500;
}
.blue-text { color: #007BFF; }
.black-text { color: #000; }

/* Cards Container */
.cards-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 5%;
}

/* Card Styling */
.card {
  width: 400px;
  background: #E3F2FD;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  opacity: 0;
  transform: translateY(30px);
}

.card.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.card:hover { transform: translateY(-5px); }

.image-container {
  overflow: hidden;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease-in-out;
}

.card:hover .card-image {
  transform: scale(1.1);
}

.card-content {
  padding: 20px;
}

.card-title {
  color: #007BFF;
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.card-description {
  font-size: 1rem;
  color: #333;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  height: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-image {
  width: 40%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
}

.close-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background: #ff0000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.close-btn:hover {
  background: #b30000;
}
</style>
