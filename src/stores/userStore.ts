import { defineStore } from 'pinia';

const API_URL = 'http://localhost:5224/Usuario';

export type Usuario = {
    id: number;
    nombre: string;
    email: string;
    password: string; // Añadir esta línea
};

export const useUserStore = defineStore('user', {
    state: () => ({
        usuarios: [] as Usuario[],
        error: null as string | null,
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.usuarios = await response.json();
            } catch (error: any) {
                this.handleError(error);
            }
        },
        async createUser(userData: any) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const newUser = await response.json();
                this.usuarios.push(newUser);
            } catch (error: any) {
                this.handleError(error);
            }
        },
        async updateUser(userId: number, userData: any) {
            try {
                const response = await fetch(`${API_URL}/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                await this.fetchUsers();
            } catch (error: any) {
                this.handleError(error);
            }
        },
        async deleteUser(userId: number) {
            try {
                const response = await fetch(`${API_URL}/${userId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.usuarios = this.usuarios.filter(u => u.id !== userId);
            } catch (error: any) {
                this.handleError(error);
            }
        },
        handleError(error: any) {
            this.error = error.message || 'An unknown error occurred.';
        },
    },
});
