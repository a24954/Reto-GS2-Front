<template>
    <div class="ds-panel">
        <div class="panel-header"></div>
        <h1>Gestión de Sesiones</h1>
        <form @submit.prevent="crearSesion">
            <select v-model="nuevaSesion.idPlay">
                <option v-for="obra in obras" :value="obra.idPlay" :key="obra.idPlay">
                    {{ obra.name }}
                </option>
            </select>
            <input v-model="nuevaSesion.sessionTime" type="datetime-local" placeholder="Fecha y hora de inicio">
            <button type="submit">Crear Sesión</button>
        </form>
        <div v-for="sesion in sesiones" :key="sesion.idSesion" class="sesion-item">
            <p>Obra: {{ sesion.obra?.name }}</p>
            <p>Precio: {{ sesion.obra?.price }}</p>
            <button @click="eliminarSesion(sesion.idSesion)">Eliminar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import sessionService from '@/services/sessionService';
import { ObrasService } from '../services/ObrasService'

interface Obra {
    idPlay: number;
    name: string;
    photo: string;
    price: number;
    description: string;
    duration: string;
}

interface Asiento {
    idSeats: number;
    number: string;
    status: boolean;
}

interface Session {
    idSesion?: number;
    sesionTime: string;
    idPlay: number;
    asientos: Asiento[];
    obra?: Obra;
    precio?: number;
}

export default defineComponent({
    name: 'DashboardPanelSesiones',
    setup() {
        const sesiones = ref<Session[]>([]);
        const obras = ref<Obra[]>([]);
        const nuevaSesion = ref({
            idPlay: 0,
            sessionTime: '',
        });

        const cargarSesiones = async () => {
            try {
                const response = await sessionService.getSessions();
                /*sesiones.value = response.map(sesionDto => ({
                    idSesion: sesionDto.idSesion || undefined, 
                    obra: sesionDto.obra,
                    asientos: sesionDto.asientos.map(asiento => ({
                        idSeats: asiento.idSeats,
                        number: asiento.number,
                        status: asiento.status
                    })),
                }));*/
            } catch (error) {
                console.error(error);
            }
        };

        const crearSesion = async () => {
            if (nuevaSesion.value.idPlay && nuevaSesion.value.sessionTime) {
                try {
                    const sesionACrear = {
                        idPlay: nuevaSesion.value.idPlay,
                        sessionTime: nuevaSesion.value.sessionTime,
                    };
                    await cargarSesiones();
                } catch (error) {
                    console.error(error);
                }
            }
        };

        onMounted(async () => {
            await cargarObras();
            await cargarSesiones();
        });

        const cargarObras = async () => {
            try {
            } catch (error) {
                console.error('Error al cargar las obras:', error);
            }
        };

        const eliminarSesion = async (idSesion?: number) => {
            if (typeof idSesion === 'number') {
                try {
                    await sessionService.deleteSession(idSesion);
                    cargarSesiones();
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error('El ID de la sesión es undefined');
            }
        };

        onMounted(cargarSesiones);
        return {
            sesiones,
            obras,
            nuevaSesion,
            crearSesion,
            cargarSesiones,
            eliminarSesion,
            cargarObras,
        };
    },
});
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
