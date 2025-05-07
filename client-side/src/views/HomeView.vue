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
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.807310262384!2d121.09570017468252!3d14.5530089859277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7cb396912f3%3A0xbc7384447895ea32!2sBlk%206%2C%205145%202nd%20St%2C%20Pasig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1746583028185!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
