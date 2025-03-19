<template>
    <div ref="productSection" class="product-section" :class="{ visible: isVisible }">
      <h2 class="section-title">💧 Premium Bottled Water Selection 💧</h2>
      <p class="section-subtitle">Stay refreshed with our high-quality, purified water.</p>
  
      <div class="product-list">
        <div class="product-card">
          <div class="image-container">
            <img src="../assets/images/test-data-image.png" alt="Product Image" class="product-image" />
          </div>
          <h5 class="product-name">Mineral Water</h5>
          <p class="product-description">Mineral Type 1</p>
          <h6 class="product-price">₱40.00</h6>
          <div class="button-group">
            <router-link to="/checkout/cart" class="btn btn-primary">Buy Now</router-link>
          </div>
        </div>
  
        <div class="product-card">
          <div class="image-container">
            <img src="../assets/images/test-data-image4.png" alt="Product Image" class="product-image" />
          </div>
          <h5 class="product-name">Mineral Water</h5>
          <p class="product-description">Mineral Type 2</p>
          <h6 class="product-price">₱40.00</h6>
          <div class="button-group">
            <router-link to="/checkout/cart" class="btn btn-primary">Buy Now</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false
      };
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      handleScroll() {
        const section = this.$refs.productSection;
        if (section) {
          const rect = section.getBoundingClientRect();
          this.isVisible = rect.top < window.innerHeight - 100;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Scroll Animation */
  .product-section {
    text-align: center;
    margin-bottom: 50px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  }
  
  .product-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Section Title */
  .section-title {
    font-size: 28px;
    font-weight: bold;
    color: #007bff;
    animation: fadeIn 1s ease-in-out;
  }
  
  .section-subtitle {
    font-size: 16px;
    color: gray;
    margin-bottom: 30px;
    animation: slideUp 1s ease-in-out;
  }
  
  /* Product List */
  .product-list {
    display: flex;
    gap: 40px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Product Card */
  .product-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 320px;
    margin-bottom: 40px;
  }
  
  .product-card:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  /* Image Styling */
  .image-container {
    overflow: hidden;
    border-radius: 12px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .product-image {
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.3s ease-in-out;
  }
  
  .image-container:hover .product-image {
    transform: scale(1.15);
  }
  
  /* Product Info */
  .product-name {
    font-weight: bold;
    font-size: 18px;
    margin: 15px 0 5px;
  }
  
  .product-description {
    font-size: 14px;
    color: gray;
    margin-bottom: 10px;
  }
  
  .product-price {
    font-size: 20px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 15px;
  }
  
  /* Button */
  .button-group {
    display: flex;
    justify-content: center;
  }
  
  .btn-primary {
    display: inline-block;
    text-decoration: none;
    background-color: #007bff;
    color: white;
    padding: 12px 18px;
    border-radius: 6px;
    font-weight: bold;
    transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
