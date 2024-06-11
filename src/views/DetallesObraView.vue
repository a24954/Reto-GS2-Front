<template>
    <div>
        <Navbar />
        <DetalleObras :obra="obra" :sesion="sesion" />
        <Footera />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useObraStore } from '../services/ObrasService';
import Navbar from '../components/Navbar.vue';
import Footera from '../components/Footer.vue';
import DetalleObras from '../components/DetalleObras.vue';
import type { Obra } from '../services/ObrasService';
import type { Session } from '../services/sessionService';

export default defineComponent({
    components: {
        Navbar,
        Footera,
        DetalleObras
    },
    setup() {
        const obra = ref<Obra | null>(null);
        const sesion = ref<Session | null>(null);
        const route = useRoute();
        const error = ref<string | null>(null);

        const loadObraDetails = async () => {
            try {
                const id = parseInt(route.params.idPlay as string);
                const obraStore = useObraStore();
                const fetchedObra = await obraStore.getObra(id);
                if (fetchedObra) {
                    obra.value = fetchedObra;
                } else {
                    error.value = "La obra no se encontró o no tiene descripción.";
                }
            } catch (e) {
                error.value = e instanceof Error ? e.message : "Error desconocido";
            }
        };

        onMounted(loadObraDetails);


        return { obra, sesion, error };
    }
});
</script>