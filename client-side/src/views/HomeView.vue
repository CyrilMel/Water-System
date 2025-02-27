<template>
  <Navbar />
  <main>
    <BannerCarousel />
    <div>
    <ContactUs />
    <Footer />
    </div>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BannerCarousel from "@/components/BannerCarousel.vue";
import ContactUs from "@/components/ContactUs.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    BannerCarousel,
    ContactUs,
    Footer
  },
};
</script>

<style scoped>

</style>