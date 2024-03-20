<template>
    <div>
        <div class="alert" id="purchaseAlert" style="display:none;">
            ¡Compra realizada con éxito!
        </div>
        <div class="obras-container">
            <label>Obras del TEATRO:</label>
            <select id="obras" v-model="selectedObra">
                <option v-for="obra in obras" :key="obra.nombre" :value="obra">{{ obra.nombre }} (${{ obra.precio }})
                </option>
            </select>
        </div>
        <ul class="showcase">
            <li>
                <SvgSeat class="seat"></SvgSeat>
                <small>Libre</small>
            </li>
            <li>
                <SvgSeat class="seat selected"></SvgSeat>
                <small>Seleccionado</small>
            </li>
            <li>
                <SvgSeat class="seat occupied"></SvgSeat>
                <small>Ocupado</small>
            </li>
        </ul>
        <div class="container">
            <div class="row" v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
                <div v-for="(seatStatus, seatIndex) in row" :key="`seat-${rowIndex}-${seatIndex}`"
                    :class="['seat-wrapper', { selected: seatStatus === 'selected', occupied: seatStatus === 'occupied' }]"
                    @click="toggleSeat(rowIndex, seatIndex)">
                    <Svgbutaca class="svg-seat"></Svgbutaca>
                </div>
            </div>
        </div>
        <p class="text">
            Has seleccionado <span id="count">{{ selectedSeats.length }}</span> asientos para la obra <span
                id="selectedObraName">{{ selectedObraName }}</span> por el precio de $<span id="total">{{ totalPrice
                }}</span>
        </p>
        <div class="button-container">
            <button id="buyButton" class="buy-button" @click="handleBuyButtonClick">Comprar ahora</button>
            <a href="mireserva.html" class="view-reservations-button">Mis Reservas</a>
            <button id="resetButton" class="reset-button" @click="handleResetButtonClick">Eliminar Reserva</button>
            <a class="view-reservations-button">Volver inicio</a>
        </div>
        <div id="emailPopup" class="email-popup" v-show="showEmailPopup">
            <div class="email-popup-content">
                <p>Introduce tu correo electrónico:</p>
                <input type="email" id="emailInput" v-model="email" placeholder="Correo electrónico" />
                <button @click="submitEmail">Enviar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Svgbutaca from './Svgbutaca.vue'

interface Obra {
    nombre: string;
    precio: number;
}

export default {
    name: 'ReservasComponente',
    components: {
        Svgbutaca,
    },
    data() {
        return {
            obras: [] as Obra[],
            selectedObra: null,
            selectedSeats: [],
            selectedObraName: '',
            totalPrice: 0,
            rows: Array(6).fill(Array(8).fill('seat')),
            showEmailPopup: false,
            email: '',
        };
    },
    methods: {
        async fetchObras() {
            try {
                const response = await fetch('http://localhost:3000/obras');
                const data = await response.json();
                this.obras = data;
            } catch (error) {
                console.error('Hubo un error al cargar las obras:', error);
            }
        },
        toggleSeat(rowIndex: number, seatIndex: number) {
            const currentSeat = this.rows[rowIndex][seatIndex];
            if (currentSeat !== 'occupied') {
                const newSeatStatus = currentSeat === 'selected' ? '' : 'selected';
                this.rows[rowIndex] = [
                    ...this.rows[rowIndex].slice(0, seatIndex),
                    newSeatStatus,
                    ...this.rows[rowIndex].slice(seatIndex + 1)
                ];
            }
        },
        handleBuyButtonClick() {
        },
        handleResetButtonClick() {
        },
        submitEmail() {
        }
    },
    mounted() {
        this.fetchObras();
        this.rows = Array.from({ length: 6 }, () => new Array(8).fill('seat'));
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: #C09057;
    color: #FFF;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.obras-container {
    margin: 20px;
    text-align: center;
}

.obras-container select {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #C09057;
    color: white;
    border: none;
    margin-top: 10px;
    cursor: pointer;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; 
    margin: auto;
    background-color: #C09057;
}


.row {
    display: flex;
    justify-content: center;
}

.seat {
    margin: 5px;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    transition: transform 0.3s;
}

.seat-wrapper {
    transition: transform 0.3s, box-shadow 0.3s; 
    box-sizing: border-box;
}

.svg-seat {
    width: 170px;
    max-width: 100%; 
    max-height: 100%;
}

.seat:hover:not(.occupied),
.seat-wrapper:hover:not(.occupied) {
    cursor: pointer;
}

.seat.selected {
    background-color: #2FDD92;
}

.seat.occupied {
    background-color: #D9534F;
}

.seat-wrapper:hover:not(.occupied) {
    transform: none; 
}

.seat-wrapper.selected {
    box-shadow: none; 
}
.seat-wrapper.selected .svg-seat {
    fill: #2FDD92; 
}

.seat-wrapper.occupied {
    background-color: #D9534F;
}

.showcase {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 20px;
}

.showcase li {
    display: flex;
    align-items: center;
    margin: 0 15px;
}

.showcase .seat {
    margin-right: 10px;
}

.text {
    margin-top: 20px;
    text-align: center;
}

.button-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
}

.buy-button,
.reset-button,
.view-reservations-button {
    background-color: #6F1D1D;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
}

.email-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
}

.email-popup-content {
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
    color: black;
    text-align: center;
}

#emailInput {
    width: 300px;
    padding: 10px;
    margin-top: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.email-popup button {
    background-color: #4ECCA3;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

.alert {
    position: fixed;
    top: 20px;
    background-color: #28a745;
    color: white;
    padding: 15px;
    border-radius: 5px;
    display: none;
    z-index: 100;
}

@media (max-width: 600px) {
    .seat {
        height: 30px;
        width: 30px;
    }

    .container {
        flex-direction: column;
    }

    .button-container {
        flex-direction: column;
    }

    .buy-button,
    .reset-button,
    .view-reservations-button {
        margin-bottom: 10px;
    }
}
</style>