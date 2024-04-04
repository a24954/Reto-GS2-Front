import axios from 'axios';

const API_URL = 'http://localhost:5224/Usuario'; 

interface UserData {
    email: string;
    password: string;
    name?: string;
}

interface LoginResponse {
    token: string;
    user: {
        role: string;
    };
}

export async function login(userData: UserData): Promise<LoginResponse> {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function register(userData: UserData): Promise<void> {
    try {
        await axios.post(`${API_URL}/register`, userData);
    } catch (error) {
        throw error.response.data;
    }
}

export function logout(): void {
    localStorage.removeItem('user');
}

export function getCurrentUser(): LoginResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
