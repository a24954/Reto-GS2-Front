<template>
    <!-- Tu plantilla aquí -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ObrasService } from '../services/ObrasService';
import type { Obra } from '../services/ObrasService';

export default defineComponent({
    name: 'Obras',
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
/* Estilos aquí */
</style>
