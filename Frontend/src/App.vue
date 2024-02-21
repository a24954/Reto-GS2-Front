<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import Footera from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footera
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
  <Footera />
  <body>
  </body>
  
</template>

<style scoped>

</style>

