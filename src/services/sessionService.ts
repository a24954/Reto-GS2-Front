import { defineStore } from 'pinia';

const BASE_URL = 'http://localhost:5224/Sesion';

export interface Obra {
    idPlay: number;
    name: string;
    photo: string;
    price: number;
    description: string;
    duration: string;
}

export interface Asiento {
    idSeats: number;
    number: string;
    status: boolean;
}

export interface Session {
    idSesion?: number;
    sesionTime: string;
    idPlay: number;
    asientos?: Asiento[];
    obra?: Obra;
    precio?: number;
}

export const useSessionStore = defineStore('session', {
    state: () => ({
        sessions: [] as Session[],
        error: null as string | null,
    }),
    actions: {
        async fetchSessions(): Promise<Session[]> {
            try {
                const response = await fetch(BASE_URL);
                if (!response.ok) {
                    throw new Error('Error al obtener las sesiones');
                }
                this.sessions = await response.json();
                return this.sessions
            } catch (error: any) {
                this.handleError(error);
                return []
            }
        },
        async getSession(id: number) {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener la sesion');
            }
            const data = await response.json();
            console.log(data);
            return data;
        },
        async createSession(sessionData: Omit<Session, 'idSesion'>): Promise<Session | undefined> {
            try {
                const response = await fetch(BASE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sessionData),
                });
                if (!response.ok) {
                    throw new Error('Error al crear la sesión');
                }
                const newSession = await response.json();
                this.sessions.push(newSession);
                return newSession;
            } catch (error: any) {
                this.handleError(error);
                return undefined;
            }
        },
        async deleteSession(idSesion: number) {
            try {
                await fetch(`${BASE_URL}/${idSesion}`, {
                    method: 'DELETE',
                });
                this.sessions = this.sessions.filter(session => session.idSesion !== idSesion);
            } catch (error: any) {
                this.handleError(error);
            }
        },
        handleError(error: any) {
            this.error = error.message || 'An unknown error occurred.';
        },
    },
});

export default useSessionStore;