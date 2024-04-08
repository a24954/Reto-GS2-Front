import axios from 'axios';
import { ref, onMounted, defineComponent } from 'vue';
import sessionService from '@/services/sessionService';

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


const BASE_URL = 'http://localhost:5224/Sesion';

const getSessions = async (): Promise<Session[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las sesiones', error);
        throw error;
    }
};

const createSession = async (sessionData: Omit<Session, 'idSesion'>): Promise<Session> => {
    try {
        const response = await axios.post(BASE_URL, sessionData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la sesión', error);
        throw error;
    }
};
const deleteSession = async (idSesion: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${idSesion}`);
    } catch (error) {
        console.error('Error al eliminar la sesión', error);
        throw error;
    }
};

export default {
    getSessions,
    createSession,
    deleteSession,
};
