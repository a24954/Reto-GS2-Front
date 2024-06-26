<template>
    <div>
        <div class="alert" id="purchaseAlert" style="display:none;">
            ¡Compra realizada con éxito!
        </div>
        <div class="obras-container">
            <h2>Reserva para la obra {{ obra?.name }}</h2>
        </div>
        <ul class="showcase">
            <li>
                <Svgbutaca class="seat" style="background-color:#C09057;"></Svgbutaca>
                <small>Libre</small>
            </li>
            <li>
                <Svgbutaca class="seat selected"></Svgbutaca>
                <small>Seleccionado</small>
            </li>
            <li>
                <Svgbutaca class="seat occupied"></Svgbutaca>
                <small>Ocupado</small>
            </li>
        </ul>
        <div class="container">
            <div class="row" v-for="(row, rowIndex) in rows" :key="rowIndex">
                <div v-for="(seat, seatIndex) in row" :key="seatIndex" :class="[
                    'contenedor-asiento',
                    { seleccionado: seat.status === 'selected', ocupado: seat.status === 'occupied' }
                ]" @click="toggleSeat(rowIndex, seatIndex)">
                    <Svgbutaca class="seat"></Svgbutaca>
                </div>
            </div>
        </div>
        <p class="text">
            Has seleccionado <span id="count">{{ selectedSeats.length }}</span> asientos para la obra <span
                id="selectedObraName">{{ obra?.name }}</span> por el precio de $<span id="total">{{ obra!.price *
                    selectedSeats.length }}</span>
        </p>
        <div class="button-container">
            <button id="buyButton" class="buy-button" @click="handleBuyButtonClick">Comprar ahora</button>
            <div class="alert" ref="purchaseAlert" style="display:none;">
                ¡Compra realizada con éxito!
            </div>
            <button id="resetButton" class="reset-button" @click="handleResetButtonClick">Eliminar Reserva</button>
            <button><router-link to="/obras" class="btn-volver reset-button">Volver a las obras</router-link></button>
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
import Svgbutaca from './Svgbutaca.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useObraStore } from '../services/ObrasService';
import { useSessionStore } from '@/services/sessionService';
import type { Session } from '@/services/sessionService';
import type { Obra } from '@/services/ObrasService';
import type { Reservation } from '../services/ObrasService';
import Swal from 'sweetalert2';

interface Seat {
    status: string;
    number: number;
    price: number;
}

export default {
    name: 'ReservasComponente',
    components: {
        Svgbutaca,
    },
    props: {
        obra: {
            type: Object as () => Obra,
            default: () => ({} as Obra)
        },
        session: {
            type: Object as () => Session,
            default: () => ({} as Session)
        }
    },
    setup(props) {
        const sessionStore = useSessionStore();
        const obra = ref<Obra | null>(props.obra || null);
        const sesion = ref<Session | null>(props.session || null);
        const sesionEscogida = ref({
            idPlay: 0,
            sesionTime: '',
        });
        let idSesionRouter = 0;
        const route = useRoute();
        const rows = ref<Array<Array<Seat>>>(Array(6).fill(Array(8).fill({ status: 'seat', number: 0, price: 0 })));
        const selectedSeats = ref<number[]>([]);
        const idReservaRoute = ref<number>();

        const cargarObras = async () => {
            try {
                const id = parseInt(route.params.idPlay as string);
                const obraStore = useObraStore();
                const response = await obraStore.getObra(id);
                obra.value = response;
                updateSeatsWithObraPrice(response.price);
            } catch (error) {
                console.error('Error al cargar las obras:', error);
            }
        };

        const cargarSesiones = async () => {
            try {
                const id = parseInt(route.params.idSesion as string);
                const sessionStore = useSessionStore();
                const response = await sessionStore.getSession(id);
                sesion.value = response;
                updateSeatsWithObraPrice(response.price);
            } catch (error) {
                console.error('Error al cargar las sesiones:', error);
            }
        };

        const cargarReservas = async () => {
            try {
                idReservaRoute.value = parseInt(route.params.idSesion as string);
                const obraStore = useObraStore();
                const reservations = await obraStore.fetchReservations(idReservaRoute.value);
                updateOccupiedSeats(reservations);
            } catch (error) {
                console.error('Error al cargar las reservas:', error);
            }
        };

        const updateSeatsWithObraPrice = (obraPrice: number) => {
            rows.value.forEach((row) => {
                row.forEach((seat) => {
                    seat.price = obraPrice;
                });
            });
        };

        const updateOccupiedSeats = (reservations: Reservation[]) => {
            rows.value.forEach((row) => {
                row.forEach((seat) => {
                    const isOccupied = reservations.some(
                        reservation => {
                            try {
                                const seatList = JSON.parse(reservation.listaSeats.replace(/'/g, '"'));
                                return reservation.idSesion === idReservaRoute.value && seatList.includes(seat.number.toString());
                            } catch (e) {
                                console.error('Error parsing listaSeats:', reservation.listaSeats, e);
                                return false;
                            }
                        }
                    );
                    if (isOccupied) {
                        seat.status = 'occupied';
                    }
                });
            });
        };


        const handleBuyButtonClick = () => {
            const obraName = obra.value?.name || 'Obra desconocida';
            const seatNumbers = selectedSeats.value.join(', ');

            Swal.fire({
                title: 'Compra realizada',
                text: `Has reservado la obra ${obraName} con los asientos: ${seatNumbers}`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        };

        onMounted(async () => {
            await cargarObras();
            await cargarSesiones();
            await cargarReservas();
        });

        return {
            sessionStore,
            obra,
            sesion,
            sesionEscogida,
            updateOccupiedSeats,
            rows,
            selectedSeats,
            handleBuyButtonClick,
            idReservaRoute
        };
    },
    data() {
        return {
            selectedObra: null as Obra | null,
            reservationPrice: 0,
            showEmailPopup: false,
            email: '',
        };
    },
    methods: {
        updateSeatsWithObraPrice(obraPrice: number) {
            this.rows.forEach((row, rowIndex) => {
                row.forEach((_seat, seatIndex) => {
                    this.rows[rowIndex][seatIndex].price = obraPrice;
                });
            });
        },

        toggleSeat(rowIndex: number, seatIndex: number) {
            const seat = this.rows[rowIndex][seatIndex];
            const selectedObraPrice = this.obra ? this.obra.price : 0;

            if (seat.status === 'selected') {
                seat.status = 'seat';
                this.reservationPrice -= selectedObraPrice;
                this.selectedSeats = this.selectedSeats.filter(s => s !== seat.number);
            } else if (seat.status !== 'occupied') {
                seat.status = 'selected';
                this.reservationPrice += selectedObraPrice;
                this.selectedSeats.push(seat.number);
            }
        },

        onSesionChange(event: Event) {
            const selectedIdPlay = (event.target as HTMLSelectElement).value;
            this.sesionEscogida.idPlay = Number(selectedIdPlay);
        },

        async handleBuyButtonClick() {
            const obraName = this.obra?.name || 'Obra desconocida';
            const seatNumbers = this.selectedSeats.join(', ');

            Swal.fire({
                title: 'Compra realizada',
                text: `Has reservado la obra ${obraName} con los asientos: ${seatNumbers}`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            const currentUserStr = localStorage.getItem("currentUser");

            if (currentUserStr) {
                const currentUser = JSON.parse(currentUserStr);

                const email = currentUser.email;

                const reservationDetails: Reservation = {
                    idSesion: this.idReservaRoute!,
                    reservationPrice: (this.obra!.price * this.selectedSeats.length).toString(),
                    user_Email: email,
                    reservationDate: new Date().toISOString(),
                    listaSeats: "[" + this.selectedSeats.map(seat => `'${seat}'`).join(", ") + "]",
                };

                try {
                    const obraStore = useObraStore();
                    await obraStore.saveReservation(reservationDetails);

                    this.selectedSeats = [];
                    this.reservationPrice = 0;

                    this.showPurchaseAlert();
                } catch (error) {
                    console.error('Hubo un error al guardar la reserva:', error);
                    alert('Hubo un error al procesar tu reserva. Por favor, intenta de nuevo.');
                }
            } else {
                alert('No has iniciado sesión.');
            }
        },

        showPurchaseAlert() {
            const purchaseAlert = this.$refs.purchaseAlert as HTMLElement;
            if (purchaseAlert) {
                purchaseAlert.style.display = 'block';
                setTimeout(() => {
                    purchaseAlert.style.display = 'none';
                }, 3000);
            }
        },

        handleResetButtonClick() {
            this.selectedSeats = [];
            this.reservationPrice = 0;
            for (let row of this.rows) {
                for (let seat of row) {
                    if (seat.status !== 'occupied') {
                        seat.status = 'seat';
                    }
                }
            }
        },

        submitEmail() {
            console.log('Email enviado a: ', this.email);
        }
    },
    mounted() {
        this.rows = this.rows.map((row, rowIndex) =>
            row.map((_seat, seatIndex) => ({
                status: 'seat',
                number: rowIndex * this.rows[0].length + seatIndex + 1,
                price: 20,
            }))
        );
    },
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
    background-color: #DAA520;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    font-size: 16px;
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

.row>.contenedor-asiento {
    width: auto;
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
    background-color: #2FDD92;
}


.seat-wrapper.selected .svg-seat {
    fill: #2FDD92;
}

.seat-wrapper.occupied {
    background-color: #D9534F;
}

.contenedor-asiento.seleccionado .svg-seat {
    fill: #2FDD92;
}

.contenedor-asiento.seleccionado,
.contenedor-asiento .selected {
    background-color: #2FDD92;
}

.contenedor-asiento.ocupado {
    background-color: #D9534F;
}

.showcase {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 20px;
    margin: 0 auto;
    width: 80%;
}

.showcase li {
    display: flex;
    align-items: center;
    margin: 0 15px;
    font-size: 14px;
}

.showcase .seat {
    margin-right: 10px;
    fill: #808080;
}

.text {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
}

.button-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.buy-button,
.reset-button,
.view-reservations-button {
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    margin: 5px;
    text-decoration: none;
    display: inline-block;
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

    .view-reservations-button {
        background-color: #555555;
    }
}
</style>