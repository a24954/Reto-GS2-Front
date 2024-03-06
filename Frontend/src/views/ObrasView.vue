<template>
    <div>
        <Navbar />
        <div class="obras-container">
            <h1 class="ejemplo">Hola, esto es la página de Obras</h1>
            <div v-if="error" class="error-message">
                Error cargando las obras: {{ error }}
            </div>
            <div v-else class="obras-grid">
                <div v-for="obra in obras" :key="obra.idPlay" class="obra">
                    <img :src="obra.photo" alt="Foto de la obra" class="obra-photo"/>
                    <div class="obra-info">
                        <h3>{{ obra.name }} - ${{ obra.price }}</h3>
                        <p>{{ obra.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <Footera />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ObrasService } from '../services/ObrasService';
import type { Obra } from '../services/ObrasService';
import Navbar from '../components/Navbar.vue';
import Footera from '../components/Footer.vue';

export default defineComponent({
    name: 'ObrasView',
    components: {
    Navbar,
    Footera,
    },
    setup() {
        const obras = ref<Obra[]>([]);
        const error = ref<string | null>(null);

        const loadObras = async () => {
            try {
                obras.value = await ObrasService.getObras();
            } catch (e) {
                const err = e as Error;
                error.value = err.message;
            }
        };

        onMounted(loadObras);

        return { obras, error };
    }
});
</script>

<style scoped>
.obras-container {
    max-width: 1200px; /* Ancho máximo del contenedor */
    margin: 0 auto; /* Centra el contenedor */
    padding: 20px;
}

.error-message {
    color: red; /* Colorea el mensaje de error */
}

.obras-grid {
    display: flex;  
    flex-wrap: wrap;
    gap: 20px; /* Espacio entre las obras */
    justify-content: center; /* Centra las obras horizontalmente */
}

.obra {
    flex: 0 1 calc(50% - 20px); /* Ajusta las obras para que ocupen la mitad del espacio menos el hueco */
    display: flex;
    flex-direction: column; /* Alinea verticalmente los elementos de cada obra */
    align-items: center; /* Centra los elementos de cada obra horizontalmente */
    background: #C09057; /* Fondo para cada obra */
    border-radius: 8px; /* Bordes redondeados para las tarjetas */
    overflow: hidden; /* Asegura que todo dentro de la tarjeta esté contenido */
}

.obra-photo {
    max-width: 100%; /* Asegura que la foto no sobrepase el ancho de la tarjeta */
    height: auto; /* Mantiene la proporción de la imagen */
}

.obra-info {
    padding: 15px; /* Espacio dentro de cada tarjeta de obra */
}

@media (max-width: 768px) {
    .obra {
        flex: 0 1 100%; /* En pantallas pequeñas, cada obra toma el ancho completo */
    }
}
</style>
