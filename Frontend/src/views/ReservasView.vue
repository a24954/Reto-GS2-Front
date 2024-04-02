<template>
    <Navbar />
    <Footer/>
</template>

<script lang="ts">
import Reservas from '../components/Reservas.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue';

export default {
    name: 'Reservas',
    components: {
        Navbar,
        Reservas,
        Footer,
    }
};
</script>

<style scoped>
</style>
