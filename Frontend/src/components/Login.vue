<template>
    <div class="form-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
            <input v-model="userData.email" type="email" placeholder="Email" required>
            <input v-model="userData.password" type="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <button @click="switchForm">¿No tienes cuenta? Regístrate</button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
//import { useAuthStore } from './authStore';

export default {
    data() {
        return {
            userData: {
                email: '',
                password: '',
            },
            error: false,
            errorMessage: '',
        };
    },
    methods: {
        switchForm() {
            this.$emit('switch');
        },
        async login() {
            if (this.validateForm()) {
                try {
                    await useAuthStore().login(this.userData);
                    // Redireccionar al usuario al dashboard después del inicio de sesión
                } catch (error) {
                    console.error('Error al iniciar sesión:', error);
                    this.error = true;
                    this.errorMessage = 'Ha ocurrido un error al iniciar sesión.';
                }
            }
        },
        validateForm() {
            if (!this.userData.email || !this.userData.password) {
                this.error = true;
                this.errorMessage = 'Email y contraseña son obligatorios.';
                return false;
            }
            this.error = false;
            return true;
        },
    },
};
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