<template>
    <div class="form-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
            <input v-model="userData.name" type="text" placeholder="Name" required>
            <input v-model="userData.password" type="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <button @click="switchForm">¿No tienes cuenta? Regístrate</button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { login, getCurrentUser } from '@/services/authService';
import type { LoginResponse } from '@/services/authService';
import { login as loginUser } from '@/services/authService';
import { UserRole, type User } from '@/services/authService';

export default defineComponent({
    data() {
        return {
            userData: {
                name: '',
                email: '',
                password: '',
                rol: 2,
            },
            error: false,
            errorMessage: '',
        };
    },

    methods: {

        async login() {
            if (this.validateForm()) {
                try {
                    const loginRequest = {
                        UserName: this.userData.name,
                        Password: this.userData.password,
                    };

                    const userResponse = await login(loginRequest);

                    if (userResponse && userResponse.rol !== undefined) {
                        localStorage.setItem('currentUser', JSON.stringify(userResponse));
                        console.log(userResponse.rol)
                        if (Number(userResponse.rol) === 1) {
                            this.$router.push('/intranet');
                        } else if (Number(userResponse.rol) === 2) {
                            this.$router.push('/');
                        }
                    } else {
                        console.log(userResponse);
                        this.error = true;
                        this.errorMessage = 'Credenciales incorrectas.';
                    }
                } catch (error) {
                    console.error('Error al iniciar sesión:', error);
                    this.error = true;
                    this.errorMessage = 'Problemas al comunicarse con el servidor.';
                }
            }
        },

        validateForm() {
            if (!this.userData.name || !this.userData.password) {
                this.error = true;
                this.errorMessage = 'El nombre de usuario y la contraseña son obligatorios.';
                return false;
            }
            this.error = false;
            return true;
        },

        switchForm() {
            this.$emit('switch-form');
        },
    },
    switchForm() {
        this.$emit('switch-form');
    },
},
);
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    max-width: 350px;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
    border-color: #59A96A;
    outline: none;
}

button {
    width: 100%;
    max-width: 350px;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}


.error {
    color: #D8000C;
    background-color: #FFD2D2;
    border-radius: 4px;
    padding: 10px;
    margin-top: 15px;
}
</style>