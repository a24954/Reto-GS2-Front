// authService.ts
const API_URL = 'http://localhost:5224/Usuario';

export interface UserData {
    UserName: string;
    Email: string;
    Password: string;
    Rol: string | number;
}

export interface LoginRequest {
    UserName: string;
    Password: string;
}

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

export const login = async (loginData: LoginRequest): Promise<User> => {
    try {
        const response = await fetch('http://localhost:5224/UsuarioLogin/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Error al iniciar sesión');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Error al comunicarse con el servidor');
    }
};

export const register = async (userData: UserData): Promise<void> => {
    try {
        const payload = {
            UserName: userData.UserName,
            Email: userData.Email,
            Password: userData.Password,
            Rol: userData.Rol === 'Admin' ? 1 : 2,
            Reservas: [],
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Error al registrarse');
        }
    } catch (error: any) {
        throw new Error(error.message || 'Error al comunicarse con el servidor');
    }
};
