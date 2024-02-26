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
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

interface Obra {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    reserva: string;
}

export default {
    name: 'Reservas',
    setup() {
        const obras: Ref<Obra[]> = ref([]);
        const selectedObraId: Ref<number | null> = ref(null);
        const purchaseAlert: Ref<boolean> = ref(false);
        const rows: Ref<Array<Array<{ index: number, selected: boolean, occupied: boolean }>>> = ref([]);
        const selectedSeatsCount: Ref<number> = ref(0);
        const selectedObraName: Ref<string> = ref('');
        const totalPrice: Ref<number> = ref(0);
        const showEmailPopup: Ref<boolean> = ref(false);
        const userEmail: Ref<string> = ref('');

        const isSelectedSeat = (rowIndex: number, seatIndex: number): boolean => {
            return rows.value[rowIndex][seatIndex].selected;
        };

        const isOccupiedSeat = (rowIndex: number, seatIndex: number): boolean => {
            return rows.value[rowIndex][seatIndex].occupied;
        };

        const toggleSeatSelection = (rowIndex: number, seatIndex: number) => {
            if (!rows.value[rowIndex][seatIndex].occupied) {
                rows.value[rowIndex][seatIndex].selected = !rows.value[rowIndex][seatIndex].selected;
                selectedSeatsCount.value = rows.value.flat().filter(seat => seat.selected).length;
                // Actualizar el nombre y el precio total según la obra seleccionada
                const selectedObra = obras.value.find(obra => obra.id === selectedObraId.value);
                if (selectedObra) {
                    selectedObraName.value = selectedObra.nombre;
                    totalPrice.value = selectedObra.precio * selectedSeatsCount.value;
                }
            }
        };

        const handleBuyButtonClick = () => {
            // Simula la compra de asientos
            rows.value.forEach(row => row.forEach(seat => {
                if (seat.selected) seat.occupied = true; // Marcar los asientos seleccionados como ocupados
            }));
            purchaseAlert.value = true; // Mostrar alerta de compra exitosa
            selectedSeatsCount.value = 0; // Resetear el contador de asientos seleccionados
            totalPrice.value = 0; // Resetear el precio total
            showEmailPopup.value = true; // Mostrar popup para enviar email
        };

        const handleResetButtonClick = () => {
            // Resetear la selección de asientos
            rows.value.forEach(row => row.forEach(seat => seat.selected = false));
            selectedSeatsCount.value = 0; // Resetear el contador de asientos seleccionados
            totalPrice.value = 0; // Resetear el precio total
            purchaseAlert.value = false; // Ocultar alerta de compra
        };

        const closeEmailPopup = () => {
            showEmailPopup.value = false;
        };

        const submitEmail = () => {
            // Aquí debes añadir la lógica para enviar el email, este es un placeholder
            console.log(`Enviando email a ${userEmail.value}`);
            showEmailPopup.value = false; // Cierra el popup después de enviar
        };

        onMounted(async () => {
            try {
                const response = await fetch('http://localhost:3000/obras');
                obras.value = await response.json();
                // Inicializa los asientos de ejemplo
                rows.value = Array(5).fill(0).map(() => Array(8).fill(0).map(() => ({ index: 0, selected: false, occupied: false })));
            } catch (error) {
                console.error('Hubo un error al cargar las obras:', error);
            }
        });

        return {
            obras,
            selectedObraId,
            purchaseAlert,
            rows,
            isSelectedSeat,
            isOccupiedSeat,
            toggleSeatSelection,
            selectedSeatsCount,
            selectedObraName,
            totalPrice,
            showEmailPopup,
            userEmail,
            handleBuyButtonClick,
            handleResetButtonClick,
            closeEmailPopup,
            submitEmail,
        };
    },
};
</script>


<style scoped>
/* Tus estilos aquí */
</style>
