<template>
    <div class="ds-panel">
        <div class="panel-header"></div>
        <h1>Gestión de Usuarios</h1>
        <form @submit.prevent="crearUsuario">
            <input v-model="nuevoUsuario.nombre" type="text" placeholder="Nombre del usuario">
            <input v-model="nuevoUsuario.email" type="email" placeholder="Email">
            <input v-model="nuevoUsuario.password" type="password" placeholder="Contraseña">
            <button type="submit">Crear Usuario</button>
        </form>
        <div v-for="usuario in usuarios" :key="usuario.id" class="usuario-item">
            <p>Nombre: {{ usuario.nombre }}</p>
            <p>Email: {{ usuario.email }}</p>
            <button @click="handleEliminarUsuario(usuario)">Eliminar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
}

export default {
    name: 'DashboardPanelUsuarios',
    setup() {
        const userStore = useUserStore();
        const nuevoUsuario = ref<Omit<Usuario, 'id'>>({ nombre: '', email: '', password: '' });

        const cargarUsuarios = async () => {
            await userStore.fetchUsers();
        };

        const crearUsuario = async () => {
            const formattedUserData = {
                nombre: nuevoUsuario.value.nombre,
                email: nuevoUsuario.value.email,
                password: nuevoUsuario.value.password,
            };
            await userStore.createUser(formattedUserData);
            nuevoUsuario.value = { nombre: '', email: '', password: '' };
        };

        const handleEliminarUsuario = async (usuario: Usuario) => {
            if (usuario.id === undefined) {
                console.error('No se puede eliminar un usuario sin ID.');
                return;
            }
            await userStore.deleteUser(usuario.id);
        };

        onMounted(cargarUsuarios);

        return {
            usuarios: userStore.usuarios,
            nuevoUsuario,
            cargarUsuarios,
            crearUsuario,
            handleEliminarUsuario,
        };
    },
};
</script>

<style scoped>
:root {
    --color-1: #2D2D34;
    --color-2: #4E9F3D;
    --color-3: #D8E9A8;
    --color-4: #555555;
    --color5: #FFFFFF;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    overflow: auto;
    background-color: burlywood;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.fa-bag-shopping:before,
.fa-shopping-bag:before {
    content: none;
}

.ds-panel {
    text-align: center;
    width: 100%;
    max-width: 960px;
    margin: auto;
    padding: 20px;
    background-color: burlywood;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ds-panel h1 {
    color: var(--color-1);
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
}

input,
textarea,
button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--color-4);
    width: 100%;
}

button {
    cursor: pointer;
    background-color: var(--color-2);
    color: black;
    background-color: white;
    border-radius: 1px solid black;
    transition: background-color 0.3s;
}

button:hover {
    background-color: darken(var(--color-2), 10%);
}

.obra-item {
    background-color: var(--color-1);
    color: var(--color5);
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.obra-item h3,
.obra-item p {
    text-align: left;
}

.obra-photo {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>
