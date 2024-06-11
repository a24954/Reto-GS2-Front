import { defineStore } from 'pinia';

const BASE_URL = 'http://localhost:5224/Obra';
const BASE_RESERVATION_URL = 'http://localhost:5224/Reserva';

export interface Obra {
    idPlay: number;
    name: string;
    price: number;
    description: string;
    photo: string;
    duration: number;
    date: string;
}

export interface ObraSesion {
    idSesion: number,
    sesionTime: string,
    idPlay: number,
    asientos: string,
    obra: Obra;
}

export type Reservation = {
    idPlay?: number,
    idSesion: number,
    reservationDate: any;
    reservationPrice: string,
    user_Email: string,
    listaSeats: string,
    reservedSeats?: any;
};

export type ReservedSeatsResponse = {
    reservedSeats: number[];
};

export const useObraStore = defineStore('obra', {
    state: () => ({
        obras: [] as Obra[],
        reservations: [] as Reservation[],
        error: null as string | null,
    }),
    actions: {
        async fetchObras(): Promise<Obra[]> {
            try {
                const response = await fetch(BASE_URL);
                if (!response.ok) {
                    throw new Error('Error al obtener las obras');
                }
                this.obras = await response.json();
                return this.obras;
            } catch (error: any) {
                this.handleError(error);
                return [];
            }
        },
        async getObra(id: number) {
            try {
                const response = await fetch(`${BASE_URL}/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener la obra');
                }
                return await response.json();
            } catch (error: any) {
                this.handleError(error);
            }
        },
        async fetchReservations(id: number): Promise<Reservation[]> {
            try {
                const response = await fetch(`${BASE_RESERVATION_URL}/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las reservas');
                }
                const reservations = await response.json();
                this.reservations = reservations;
                return reservations;
            } catch (error: any) {
                this.handleError(error);
                return [];
            }
        },
        async saveReservation(reservation: Reservation) {
            try {
                const response = await fetch(BASE_RESERVATION_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservation),
                });
                if (!response.ok) {
                    throw new Error('Error al guardar la reserva');
                }
                const newReservation = await response.json();
                this.reservations.push(newReservation);
            } catch (error: any) {
                this.handleError(error);
            }
        },
        async createObra(obra: Obra): Promise<Obra | undefined> {
            try {
                const response = await fetch(BASE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obra),
                });
                if (!response.ok) {
                    throw new Error('Error al crear la obra');
                }
                const newObra = await response.json();
                this.obras.push(newObra);
                return newObra;
            } catch (error: any) {
                this.handleError(error);
                return undefined;
            }
        },
        async updateObra(obra: Obra) {
            try {
                const response = await fetch(`${BASE_URL}/${obra.idPlay}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obra),
                });
                if (!response.ok) {
                    throw new Error('Error al actualizar la obra');
                }
                const updatedObraIndex = this.obras.findIndex(o => o.idPlay === obra.idPlay);
                if (updatedObraIndex !== -1) {
                    this.obras[updatedObraIndex] = obra;
                }
            } catch (error: any) {
                this.handleError(error);
            }
        },
        async deleteObra(id: number) {
            try {
                const response = await fetch(`${BASE_URL}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar la obra');
                }
                this.obras = this.obras.filter(obra => obra.idPlay !== id);
            } catch (error: any) {
                this.handleError(error);
            }
        },
        handleError(error: any) {
            this.error = error.message || 'An unknown error occurred.';
        },
    },
});

export default useObraStore;
