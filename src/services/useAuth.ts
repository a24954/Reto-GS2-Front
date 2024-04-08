// useAuth.js
import { ref } from 'vue';
import * as authService from './authService';
import { LoginRequest } from './authService';
import { User } from './authService';

const user = ref(null);

export function useAuth() {
    const isLoggedIn = ref(false);

    const login = async (loginData: LoginRequest) => {
        try {
            const response = await authService.login(loginData);
            if (response) {
                const user = ref<User | null>(null);
                isLoggedIn.value = true;
                localStorage.setItem('currentUser', JSON.stringify(response));
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        user.value = null;
        isLoggedIn.value = false;
        localStorage.removeItem('currentUser');
    };

    return { user, isLoggedIn, login, logout };
}
