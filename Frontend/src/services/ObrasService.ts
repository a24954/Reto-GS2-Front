interface Obra {
    id: number;
    nombre: string;
    precio: number;
    // Agrega otros campos necesarios
}

export const ObrasService = {
    async getObras(url: string): Promise<Obra[]> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener las obras');
        }
        return response.json();
    },

    async getObra(id: number, url: string): Promise<Obra> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la obra');
        }
        return response.json();
    },

    async createObra(obra: Obra, url: string): Promise<Obra> {
        const response = await fetch(url, {
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

    async updateObra(obra: Obra, url: string): Promise<void> {
        const response = await fetch(`${url}/${obra.id}`, {
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

    async deleteObra(id: number, url: string): Promise<void> {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la obra');
        }
    },
};
