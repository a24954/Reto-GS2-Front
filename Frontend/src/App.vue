<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  }
});
</script>

<template>
  <header>
    <div class="wrapper">
      <Navbar />
    </div>
  </header>
  <RouterView />
</template>

<style scoped>

</style>

