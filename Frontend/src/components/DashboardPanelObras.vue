<template>
    <div class="ds-panel">
        <div class="panel-header">
            <div class="icono">
                <i class="fa-solid fa-bag-shopping"></i>
            </div>
        </div>
        <h1>Gestion de obras</h1>
        <form @submit.prevent="crearObra">
            <input v-model="nuevaObra.name" type="text" placeholder="Nombre de la obra">
            <input v-model="nuevaObra.price" type="number" placeholder="Precio">
            <textarea v-model="nuevaObra.description" placeholder="Descripción"></textarea>
            <input v-model="nuevaObra.photo" type="text" placeholder="URL de la foto">
            <button type="submit">Crear Obra</button>
        </form>

        <!-- Lista de obras existentes -->
        <div v-for="obra in obras" :key="obra.idPlay">
            <h3>{{ obra.name }}</h3>
            <p>{{ obra.description }}</p>
            <!-- Botón para eliminar obra -->
            <button @click="eliminarObra(obra.idPlay)">Eliminar</button>
        </div>
    </div>
</template>

<script lang="ts">

import { ref, onMounted } from 'vue';
import { ObrasService } from '../services/ObrasService'; // Asegúrate de que la ruta sea correcta
import type { Obra } from '../services/ObrasService'; // Uso correcto de type import

export default {
    name: 'DashboardPanel',
    setup() {
        const obras = ref<Obra[]>([]);
        const nuevaObra = ref<Obra>({ idPlay: 0, name: '', price: 0, description: '', photo: '' });


        const cargarObras = async () => {
            try {
                obras.value = await ObrasService.getObras();
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(cargarObras);

        const crearObra = async () => {
            try {
                console.log("Creando obra: ", nuevaObra.value);
                const obraCreada = await ObrasService.createObra(nuevaObra.value);
                obras.value.push(obraCreada);
                nuevaObra.value = { idPlay: 0, name: '', price: 0, description: '', photo: '' };
            } catch (error) {
                console.error(error);
            }
        };

        const eliminarObra = async (id: number) => {
        try {
            await ObrasService.deleteObra(id);
            obras.value = obras.value.filter(obra => obra.idPlay !== id); // Elimina la obra de la lista
        } catch (error) {
            console.error(error);
        }
    };

    return {
        obras,
        nuevaObra,
        cargarObras,
        crearObra,
        eliminarObra,
    };
},
};

</script>



<style scoped>
:root {
    --color-1: #2D2D34;
    /* Oscuro */
    --color-2: #4E9F3D;
    /* Verde vibrante */
    --color-3: #D8E9A8;
    /* Verde claro */
    --color-4: #555555;
    /* Gris medio */
    --color5: #FFFFFF;
    /* Blanco */
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    /* Asegura consistencia de la fuente */
}

body {
    overflow: auto;
    /* Permite el desplazamiento si es necesario */
    background-color: burlywood;
    /* Nuevo color de fondo */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /* Asegura que el body ocupe toda la altura de la pantalla */
}

.fa-bag-shopping:before,
.fa-shopping-bag:before {
    content: none;
}

.ds-panel {
    text-align: center;
    width: 100%;
    /* Ahora ocupa todo el ancho */
    max-width: 960px;
    /* Limita el ancho máximo para que no se vea demasiado ancho en pantallas grandes */
    margin: auto;
    /* Centra el panel si no ocupa todo el ancho */
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
    /* Cambia la dirección de los elementos del formulario */
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
    /* Asegura que los elementos del formulario ocupen todo el ancho */
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
    /* Alinea el texto a la izquierda */
}

/* Puedes ajustar o eliminar el resto del CSS que no afecte a la vista actual */</style>
