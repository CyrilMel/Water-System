<template>
  <Navbar />
  <main>
    <BannerCarousel />
    <h2 class="text-center m-5 fw-bolder">Our Products</h2>
    <productCard />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import productCard from "@/components/productCard.vue";
import BannerCarousel from "@/components/BannerCarousel.vue";

export default {
  components: {
    Navbar,
    productCard,
    BannerCarousel
  },
};
</script>

<style scoped>

</style>