<template>
    <div>
        <Navbar />
        <div class="obras-container">
            <h1 class="ejemplo">SESIONES DE OBRAS</h1>
            <input type="text" v-model="searchQuery" placeholder="Buscar obras por nombre..." class="search-input" />
            <div v-if="error" class="error-message">
                Error cargando las obras: {{ error }}
            </div>
            <div v-else class="obras-grid">
                <div v-for="obra in filteredObras" :key="obra?.obra.idPlay" class="obra">
                    <img :src="obra?.obra.photo" alt="Foto de la obra" class="obra-photo" />
                    <div class="obra-info">
                        <h3>{{ obra?.obra.name }}</h3>
                        <h3>{{ obra?.obra.description }}</h3>
                        <h3>{{ obra?.sesionTime }}</h3>
                        <button class="details-button">
                            <router-link
                                :to="{ name: 'DetallesObra', params: { idPlay: obra?.obra.idPlay.toString(), idSesion: obra?.idSesion.toString() } }">
                                Ver detalles
                            </router-link>

                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footera />
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useObraStore } from '../services/ObrasService';
import type { ObraSesion } from '../services/ObrasService';
import Navbar from '../components/Navbar.vue';
import Footera from '../components/Footer.vue';
import useSessionStore from '@/services/sessionService';

export default defineComponent({
    name: 'ObrasView',
    components: {
        Navbar,
        Footera,
    },
    setup() {
        const obras = ref<ObraSesion[]>([]);
        const error = ref<string | null>(null);
        const searchQuery = ref<string>('');

        const loadObras = async () => {
            try {
                const sessionStore = useSessionStore();
                const response: any = await sessionStore.fetchSessions();
                obras.value = response;
            } catch (e) {
                const err = e as Error;
                error.value = err.message;
            }
        };

        onMounted(loadObras);

        const filteredObras = computed(() => {
            if (!searchQuery.value) {
                return obras.value;
            }
            return obras.value.filter((obra) =>
                obra.obra.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        });

        return { obras, error, searchQuery, filteredObras };
    }
});
</script>


<style scoped>
.ejemplo {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 3px solid black;
    background-color: #C09057;
}

.search-input {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.obras-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.error-message {
    color: red;
}

.obras-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.obra {
    flex: 0 1 calc(50% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #C09057;
    border-radius: 8px;
    overflow: hidden;
    border: 3px solid black;
    padding: 1em;
    box-sizing: border-box;
}

.obra-photo {
    width: 100%;
    height: 450px;
    border-radius: 10px;
    margin: auto;
    display: block;
}

.obra-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 1em;
    overflow-wrap: break-word;
    word-break: break-word;
}

.obra-info h3:nth-child(2) {
    font-size: 1em;
    color: #555;
}

.details-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #6F1D1D;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 5%;
}

.details-button a {
    color: white;
    text-decoration: none;
}

.details-button:hover {
    background-color: #B8860B;
}

.router-link-active {
    color: inherit;
    text-decoration: none;
}

@media (max-width: 768px) {
    .obra {
        flex: 0 1 100%;
    }
}
</style>
