<template>
    <div class="form-container">
        <h2>Registro</h2>
        <form @submit.prevent="register">
            <input v-model="userData.name" type="text" placeholder="Nombre" required>
            <input v-model="userData.email" type="email" placeholder="Email" required>
            <input v-model="userData.password" type="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
        </form>
        <button @click="switchToLogin">¿Ya tienes cuenta? Inicia sesión</button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
//import { useAuthStore } from './authStore';

export default {
    data() {
        return {
            userData: {
                name: '',
                email: '',
                password: '',
            },
            error: false,
            errorMessage: '',
        };
    },
    methods: {
        async register() {
            if (this.validateForm()) {
                try {
                    await useAuthStore().register(this.userData);
                    // Redireccionar al usuario al dashboard después del registro
                } catch (error) {
                    console.error('Error al registrar:', error);
                    this.error = true;
                    this.errorMessage = 'Ha ocurrido un error al registrar.';
                }
            }
        },
        switchToLogin() {
            this.$emit('switch');
        },
        validateForm() {
            if (!this.userData.name || !this.userData.email || !this.userData.password) {
                this.error = true;
                this.errorMessage = 'Todos los campos son obligatorios.';
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
