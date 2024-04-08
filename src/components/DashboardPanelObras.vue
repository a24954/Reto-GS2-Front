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
            <input v-model="nuevaObra.duration" type="text" placeholder="Duración de la obra">
            <textarea v-model="nuevaObra.description" placeholder="Descripción"></textarea>
            <input v-model="nuevaObra.date" type="datetime-local" placeholder="Fecha y hora de la obra">
            <input v-model="nuevaObra.photo" type="text" placeholder="URL de la foto">
            <button type="submit">Crear Obra</button>
        </form>

        <div v-for="obra in obras" :key="obra?.idPlay">
            <h3>{{ obra?.name }}</h3>
            <p>{{ obra?.description }}</p>
            <p>{{ obra?.price }}</p>
            <p>{{ obra?.duration }}</p>
            <button @click="eliminarObra(obra!.idPlay)">Eliminar</button>
        </div>
    </div>
</template>

<script lang="ts">

import { ref, onMounted } from 'vue';
import { ObrasService } from '../services/ObrasService';
import type { Obra } from '../services/ObrasService'; 


interface Obra2 {
    idPlay: number;
    name: string;
    price: number;
    description: string;
    photo: string;
    duration: number;
    date: string;
}

export default {
    name: 'DashboardPanel',
    setup() {
        const obras = ref<Obra[]>([]);
        const nuevaObra = ref<Obra2>({
            idPlay: 0,
            name: '',
            price: 0,
            description: '',
            photo: '',
            duration: 0,
            date: new Date().toISOString().substring(0, 16),
        });


        const cargarObras = async () => {
            try {
                obras.value = await ObrasService.getObras();
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(cargarObras);

        const crearObra = async () => {
            if (nuevaObra.value) {
                try {
                    console.log("Creando obra: ", nuevaObra.value);
                    const obraCreada = await ObrasService.createObra(nuevaObra.value);
                    obras.value.push(obraCreada);
                    nuevaObra.value = {
                        idPlay: 0,
                        name: '',
                        price: 0,
                        description: '',
                        photo: '',
                        duration: 0,
                        date: new Date().toISOString().substring(0, 16),
                    };
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error("No se han completado los datos de la nueva obra.");
            }
        };

        const eliminarObra = async (id: number) => {
            try {
                await ObrasService.deleteObra(id);
                obras.value = obras.value.filter(obra => obra?.idPlay !== id); // Elimina la obra de la lista
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
