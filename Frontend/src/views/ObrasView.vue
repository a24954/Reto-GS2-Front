<template>
    <div>
        <h1 class="ejemplo">Hola, esto es la página de Obras</h1>
        <div v-if="error">
            Error cargando las obras: {{ error }}
        </div>
        <div v-else>
            <ul>
                <li v-for="obra in obras" :key="obra.id">
                    <h3>{{ obra.Nombre }} - ${{ obra.Precio }}</h3>
                    <p>{{ obra.Descripcion }}</p>
                    <p>Reserva: {{ obra.Reserva }}</p>
                    <p>Precio: {{ obra.Precio }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ObrasService } from '../services/ObrasService';
import type { Obra } from '../services/ObrasService';

export default defineComponent({
    name: 'ObrasView',
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
