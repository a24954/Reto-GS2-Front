<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelSesiones />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import type { Session } from '../services/sessionService';
import LeftMenu from '../components/LeftMenu.vue';
import DashboardPanelSesiones from '../components/DashboardPanelSesiones.vue';
import sessionService from '../services/sessionService';

export default defineComponent({
    name: 'SesionView',
    components: {
        LeftMenu,
        DashboardPanelSesiones,
    },
    setup() {
        const sesiones = ref<Session[]>([]);
        const error = ref<string | null>(null);

        const loadSesiones = async () => {
            try {
                sesiones.value = await sessionService.getSessions(); 
            } catch (e) {
                const err = e as Error;
                error.value = err.message;
            }
        };

        onMounted(loadSesiones);

        return { sesiones, error };
    }
});
</script>

<style scoped>
</style>