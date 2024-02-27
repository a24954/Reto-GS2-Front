<template>
    <div>
        <Navbar />
    </div>
    <div>
        <h1 class="ejemplo">Hola, esto es la página de Obras</h1>
        <div v-if="error">
            Error cargando las obras: {{ error }}
        </div>
        <div v-else>
            <ul>
                <li v-for="obra in obras" :key="obra.idPlay">
                    <img :src="obra.photo" alt="Foto de la obra" class="obra-photo"/>
                    <h3>{{ obra.name }} - ${{ obra.price }}</h3>
                    <p>{{ obra.description }}</p>
                </li>
            </ul>
        </div>
    </div>
    <div>
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

<style>
.ejemplo {
    color: black;
}
</style>
