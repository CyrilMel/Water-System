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
    productCard, // Registered ProductCard
    ContactUs,
    Footer,
    MineralDelivery,
    ChatBot,
  },
};
</script>
