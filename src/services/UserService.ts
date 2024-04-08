import axios from 'axios';

const API_URL = 'http://localhost:5224/Usuario';

export type Usuario = {
    id: number;
    nombre: string;
    email: string;
};

export const userService = {
    async getUsers(): Promise<any> {
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error: any) {
            handleError(error);
        }
    },

    async createUser(userData: any): Promise<any> {
        try {
            const response = await axios.post(`${API_URL}`, userData);
            return response.data;
        } catch (error: any) {
            handleError(error);
        }
    },

    async updateUser(userId: number, userData: any): Promise<any> {
        try {
            const response = await axios.put(`${API_URL}/${userId}`, userData);
            return response.data;
        } catch (error: any) {
            handleError(error);
        }
    },

    async deleteUser(userId: number): Promise<any> {
        try {
            const response = await axios.delete(`${API_URL}/${userId}`);
            return response.data;
        } catch (error: any) {
            handleError(error);
        }
    },
};

function handleError(error: any): void {
    if (error.response) {
        throw error.response.data;
    } else if (error.request) {
        throw new Error('No response was received from the server.');
    } else {
        throw new Error('Error setting up the request.');
    }
}
