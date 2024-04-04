export type Obra = {
    idPlay: number;
    name: string;
    price: number;
    description: string;
    photo: string;
    duration: number;
    date: string;
} | null;

const BASE_URL = 'http://localhost:5224/Obra';

export const ObrasService = {
    async getObras(): Promise<Obra[]> {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Error al obtener las obras');
        }
        return response.json();
    },

    async getObra(id: number): Promise<Obra | null> {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la obra');
        }
        const data = await response.json();
        console.log(data); 
        return data;
    },

    async createObra(obra: Obra): Promise<Obra> {
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
        return response.json();
    },

    async updateObra(obra: Obra): Promise<void> {
        const response = await fetch(`${BASE_URL}/${obra?.idPlay}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obra),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la obra');
        }
    },

    async deleteObra(id: number): Promise<void> {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la obra');
        }
    },
};
