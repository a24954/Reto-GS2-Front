// useAuth.ts
import { ref } from 'vue';
import { login as loginService, register as registerService } from './authService';
import type { LoginRequest, UserData } from './authService';
import type { User } from './authService';

const user = ref<User | null>(null);
const isLoggedIn = ref(false);

export function useAuth() {
    const login = async (loginData: LoginRequest) => {
        try {
            const response = await loginService(loginData);
            if (response) {
                user.value = response;
                isLoggedIn.value = true;
                localStorage.setItem('currentUser', JSON.stringify(response));
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const register = async (userData: UserData) => {
        try {
            await registerService(userData);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const logout = () => {
        user.value = null;
        isLoggedIn.value = false;
        localStorage.removeItem('currentUser');
    };

    return { user, isLoggedIn, login, register, logout };
}
