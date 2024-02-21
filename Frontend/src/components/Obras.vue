<template>
    <!-- Tu plantilla aquí -->
</template>
  
<script lang="ts">
import Vue from 'vue';
import { ObrasService } from '../services/ObrasService'; // Asegúrate de que la ruta de importación sea correcta

export default Vue.extend({
    data() {
        return {
            obras: [],
            error: null,
        };
    },
    methods: {
        async loadObras() {
            try {
                this.obras = await ObrasService.getObras();
            } catch (error) {
                this.error = error.message;
            }
        },
        // Puedes agregar aquí los métodos para crear, actualizar y eliminar obras
    },
    created() {
        this.loadObras();
    },
});
</script>

<style scoped>
/* Estilos aquí */
</style>
