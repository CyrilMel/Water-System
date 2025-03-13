<template>
  <Navbar />
  <main>
    <ChatBot></ChatBot>

    <div id="home">
      <BannerCarousel />
    </div>

    <div id="about">
      <productCard />
    </div>

    <div id="delivery">
      <MineralDelivery />
    </div>
    <div class="iframe-container">
     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7471.957251572294!2d121.06718689357909!3d14.560025899999987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c87f24b30353%3A0xe23c5dcee145d66f!2sPasig%20Catholic%20College%20(Main%20Campus)!5e1!3m2!1sen!2sph!4v1741572153303!5m2!1sen!2sph" width="900" height="450"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div id="contact">
      <ContactUs />
    </div>
    <Footer />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BannerCarousel from "@/components/BannerCarousel.vue";
import productCard from "@/components/productCard.vue"; // Added ProductCard for "About"
import ContactUs from "@/components/ContactUs.vue";
import MineralDelivery from "@/components/MineralDelivery.vue";
import Footer from "@/components/Footer.vue";
import ChatBot from "@/components/ChatBot.vue";

export default {
  components: {
    Navbar,
    BannerCarousel,
    productCard, 
    ContactUs,
    Footer,
    MineralDelivery,
    ChatBot,
  },
};
</script>
<style>
  .iframe-container {
    display: inline-block;
    box-shadow: 10px 15px 10px rgba(0, 0, 0, 0.5); 
    border-radius: 10px; 
    overflow: hidden; 
    margin-left: 18.5%;
  }

  .iframe-container iframe {
    display: block;
    border: none;
  }

</style>