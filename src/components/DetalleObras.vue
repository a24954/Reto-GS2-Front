<template>
    <div class="detalle-container" v-if="obra">
        <img :src="obra.photo" alt="Foto de la obra" class="obra-photo" />
        <div class="obra-info">
            <h1 class="obra-title">{{ obra.name }}</h1>
            <p class="obra-price">Precio: ${{ obra.price }}</p>
            <p class="obra-duration">Duración: {{ obra.duration }}</p>
            <div class="buttons-container">
                <router-link :to="{ name: 'Reservas', params: { nombre: obra.name } }" class="btn-reservar">
                    Reservar
                </router-link>

                <router-link to="/obras" class="btn-volver">Volver a las obras</router-link>
            </div>
        </div>
    </div>
    <div v-else class="loading">Cargando detalles de la obra...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Obra } from '../services/ObrasService';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        obra: {
            type: Object as PropType<Obra>,
            required: true
        },
    },
    setup(props) {
        const router = useRouter();

        const reservarObra = () => {
            if(props.obra && props.obra.idPlay) {
                router.push({ name: 'reservas', params: { idObra: props.obra.idPlay } });
            }
        };
            const reservar = () => {
                const router = useRouter();
                router.push({ name: 'Reservas', params: { idObra: props.obra?.idPlay } });
            };

            return {
                reservarObra
            };
        }

    });
</script>

<style scoped>
.detalle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 800px;
    margin: 2em auto;
    padding: 1em;
    background-color: #d7d7d7;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.obra-photo {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 1em;
}

.obra-info {}

.obra-title {}


.obra-price,
.obra-duration {
    font-size: 20px;
    color: black;
}

.buttons-container {
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-top: 2em;
}

.btn-reservar,
.btn-volver {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1em;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    background-color: #C09057;
    transition: background-color 0.3s ease;
}

.btn-reservar:hover,
.btn-volver:hover {
    background-color: #af7a48;
}

.loading {
    text-align: center;
    font-size: 1.5em;
}
</style>