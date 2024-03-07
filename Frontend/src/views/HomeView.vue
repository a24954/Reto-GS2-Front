<template>
  <div class="home">
    <Navbar />
    <HomeSlider />
    <ObrasHome />
    <Footera />
  </div>
</template>

<script lang="ts">
import HomeSlider from '../components/HomeSlider.vue'
import ObrasHome from '../components/ObrasHome.vue';
import Navbar from '../components/Navbar.vue';
import Footera from '../components/Footer.vue';

export default {
  name: 'HomeView',
  components: {
    HomeSlider,
    ObrasHome,
    Navbar,
    Footera
  }
};
</script>

<style scoped>
footer{
  margin-top: -5%;
}
</style>