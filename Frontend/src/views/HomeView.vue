<template>
  <div class="home">
    <HomeSlider />
    <ObrasHome />
  </div>
</template>

<script lang="ts">
import HomeSlider from '../components/HomeSlider.vue'
import ObrasHome from '../components/ObrasHome.vue';

export default {
  name: 'HomeView',
  components: {
    HomeSlider,
    ObrasHome
  }
};
</script>

<style>
</style>