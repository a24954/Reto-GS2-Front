<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelUsuarios />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'; // Import onMounted
import LeftMenu from '@/components/LeftMenu.vue';
import DashboardPanelUsuarios from '@/components/DashboardPanelUsuario.vue';
import { useUserStore } from '@/stores/userStore';

export default defineComponent({
    name: 'UsuarioView',
    components: {
        LeftMenu,
        DashboardPanelUsuarios,
    },
    setup() {
        const userStore = useUserStore();

        const loadUsuarios = async () => {
            await userStore.fetchUsers();
        };

        onMounted(loadUsuarios);

        return { 
            usuarios: userStore.usuarios,
            error: userStore.error
        };
    }
});
</script>

<style scoped>
.titulo {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 3px solid black;
    background-color: #C09057;
}
</style>
