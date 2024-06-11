<template>
    <!-- Tu plantilla aquí -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useObraStore } from '../services/ObrasService';
import type { Obra } from '../services/ObrasService';

export default defineComponent({
    name: 'Obras',
    props: {
        obra: {
            type: Object as () => Obra,
            default: () => ({} as Obra)
        }
    },
    setup(props) {
        const obras = ref<Obra | null>(props.obra || null);
        const error = ref<string | null>(null);
        const loadObras = async () => {
            try {
                const obraStore = useObraStore();
                const response: any = await obraStore.fetchObras();
                obras.value = response;
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
</style>
