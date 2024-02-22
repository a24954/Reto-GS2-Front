<template>
    <div>
        <div class="alert" v-if="purchaseAlert">
            ¡Compra realizada con éxito!
        </div>
        <div class="obras-container">
            <label>Obras del TEATRO:</label>
            <select v-model="selectedObraId">
                <option v-for="obra in obras" :key="obra.id" :value="obra.id">
                    {{ obra.nombre }} (${{ obra.precio }})
                </option>
            </select>
        </div>

        <ul class="showcase">
            <li>
                <div class="seat"></div>
                <small>Libre</small>
            </li>
            <li>
                <div class="seat selected"></div>
                <small>Seleccionado</small>
            </li>
            <li>
                <div class="seat occupied"></div>
                <small>Ocupado</small>
            </li>
        </ul>

        <div class="container">
            <div class="row" v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
                <div class="seat"
                    :class="{ 'selected': isSelectedSeat(rowIndex, seatIndex), 'occupied': isOccupiedSeat(rowIndex, seatIndex) }"
                    v-for="seatIndex in row" :key="`seat-${rowIndex}-${seatIndex}`"
                    @click="toggleSeatSelection(rowIndex, seatIndex)"></div>
            </div>
        </div>

        <p class="text">
            Has seleccionado <span>{{ selectedSeatsCount }}</span> asientos para la obra
            <span>{{ selectedObraName }}</span> por el precio de $<span>{{ totalPrice }}</span>.
        </p>

        <div class="button-container">
            <button @click="handleBuyButtonClick" class="buy-button">Comprar ahora</button>
            <button @click="handleResetButtonClick" class="reset-button">Eliminar Reserva</button>
            <!-- Otros botones aquí -->
        </div>

        <!-- Popup de email -->
        <div id="emailPopup" v-if="showEmailPopup" class="email-popup">
            <div class="email-popup-content">
                <span class="close" @click="closeEmailPopup">&times;</span>
                <p>Introduce tu correo electrónico:</p>
                <input type="email" v-model="userEmail" placeholder="Correo electrónico" />
                <button @click="submitEmail">Enviar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, Ref } from 'vue';


// Define la interfaz para una obra
interface Obra {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    reserva: string; // Usar string si la fecha viene en formato de texto
}

export default {
    name: 'Reservas',
    setup() {
        // Inicializa las obras como un array vacío y asigna el tipo Obra[]
        const obras: Ref<Obra[]> = ref([]);
        // Usa null para la obra seleccionada inicialmente y proporciona un tipo
        const selectedObraId: Ref<number | null> = ref(null);
        // Para el alerta de compra, puedes usar una ref booleana
        const purchaseAlert: Ref<boolean> = ref(false);

        // Función para cargar las obras
        onMounted(async () => {
            try {
                const response = await fetch('http://localhost:3000/obras');
                // Asegúrate de que la respuesta es del tipo esperado
                obras.value = (await response.json()) as Obra[];
            } catch (error) {
                console.error('Hubo un error al cargar las obras:', error);
            }
        });

        // Aquí puedes agregar funciones y métodos para manejar selecciones y compras

        // Asegúrate de retornar todas las variables y métodos que necesitará tu plantilla
        return {
            obras,
            selectedObraId,
            purchaseAlert,
        };
    },
};
</script>

<style scoped>
/* Tus estilos aquí */
</style>
