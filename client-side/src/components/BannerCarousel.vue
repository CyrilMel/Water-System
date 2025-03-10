<template>
  <div>
    <div class="video-container">
      <div class="overlay">
        <h1 class="fade-in-left">
          <span class="highlight">Stay Hydrated,</span>
        </h1>
        <h2 class="fade-in">Stay Healthy!</h2>
        <p class="fade-in-delay">
          Refreshing, pure, and essential—water keeps you energized and feeling your best every day!<br>
        </p>
        <div class="buttons">
          <button class="btn primary" @click="scrollTo('delivery', 100)">Start Water Delivery</button>
          <button class="btn secondary" @click="scrollTo('about', 100)">Our Services</button>
        </div>
      </div>
      <video autoplay loop muted playsinline>
        <source src="../assets/videos/banner.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
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
.video-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  bottom: 28%;
  left: 5%;
  text-align: left;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  z-index: 2;
  pointer-events: auto;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
}

h1 {
  font-size: 4.5rem;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 1px;
  margin-bottom: -10px;
  opacity: 0;
  transform: translateX(-50px);
  animation: fadeInLeft 1s ease-out forwards;
}

h2 {
  font-size: 3.5rem;
  font-weight: 300;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.5s forwards;
}

.highlight {
  color: #1E73BE;
  font-weight: bold;
}

p {
  font-size: 1.4rem;
  margin-top: 15px;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.8s forwards;
  max-width: 450px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

.btn {
  padding: 12px 20px;
  font-size: 100%;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 550;
}

.primary {
  background-color: #007BFF;
  color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 123, 255, 0.4);
  animation: fadeIn 1s ease-out 1s forwards;
}

.primary:hover {
  background-color: #0056b3;
  transform: scale(1.1);
  box-shadow: 0px 6px 16px rgba(0, 123, 255, 0.6);
  animation: bounce 0.4s ease-in-out;
}

.secondary {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
  animation: fadeIn 1s ease-out 1.2s forwards;
}

.secondary:hover {
  background-color: #ffffff;
  color: #007BFF;
  transform: scale(1.1);
}

@keyframes fadeInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.12);
  }
}

video {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

@media (max-width: 768px) {
  .overlay {
    bottom: 15%;
    left: 5%;
    width: 90%;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
  }

  .btn {
    padding: 12px 24px;
    font-size: 1rem;
  }
}
</style>
