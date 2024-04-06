import axios, { AxiosError } from 'axios';

interface UserData {
    UserName: string;
    Email: string;
    Password: string;
    Rol: string | number;
}
interface LoginRequest {
    UserName: string;
    Password: string;
}

const API_URL = 'http://localhost:5224/Usuario';

export interface LoginResponse {
    token: string;
    user: {
        rol: string;
    };
}

export enum UserRole {
    Admin = 1,
    StandardUser = 2,
}

export interface User {
    IdUser: number;
    UserName: string;
    Password: string;
    Email: string;
    rol: number;    
}

export async function login(loginData: LoginRequest): Promise<User> {
    try {
        const API_URL = 'http://localhost:5224/UsuarioLogin/Login';
        const response = await axios.post<User>(API_URL, loginData);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        } else {
            throw new Error('Error al comunicarse con el servidor');
        }
    }
}

export async function register(userData: UserData): Promise<void> {
    try {
        const payload = {
            UserName: userData.UserName,
            Email: userData.Email,
            Password: userData.Password,
            Rol: userData.Rol === 'Admin' ? 1 : 2,
            Reservas: []
        };
        const response = await axios.post(`${API_URL}`, payload);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        } else {
            throw new Error('Error al comunicarse con el servidor');
        }
    }
}

export function logout(): void {
    localStorage.removeItem('user');
}

export function getCurrentUser(): LoginResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
