<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelUsuario />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Usuario } from '../services/UserService';
import LeftMenu from '@/components/LeftMenu.vue';
import DashboardPanelUsuario from '@/components/DashboardPanelUsuario.vue';

export default defineComponent({
    name: 'UsuarioView',
    components: {
        LeftMenu,
        DashboardPanelUsuario,
    },
    setup() {
        const usuarios = ref<Usuario[]>([]);
        const error = ref<string | null>(null);

        const loadUsuarios = async () => {
            try {
                usuarios.value = await UserService.getUsers(); // Asegúrate de que este método esté implementado en UserService
            } catch (e) {
                const err = e as Error;
                error.value = err.message;
            }
        };

        onMounted(loadUsuarios);

        return { usuarios, error };
    }
});
</script>

<style scoped>
/* Reutilizar los estilos del componente ObrasView.vue y adaptarlos según sea necesario */
.titulo {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 3px solid black;
    background-color: #C09057;
}

.usuarios-container {
    /* Estilos para contenedor de usuarios */
}

/* Resto de estilos aquí... */
</style>