import axios from 'axios';

const API_URL = 'http://localhost:5224/Usuario';

export async function getUsers(): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error: any) { 
        if (error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}
