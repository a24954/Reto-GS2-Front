<template>
    <div class="form-container">
        <h2>Registro</h2>
        <form @submit.prevent="register">
            <input v-model="userData.name" type="text" placeholder="Nombre" required>
            <input v-model="userData.email" type="text" placeholder="Email" required>
            <input v-model="userData.password" type="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
        </form>
        <button @click="switchToLogin">¿Ya tienes cuenta? Inicia sesión</button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { register } from '@/services/authService';

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
        async register() {
            if (this.validateForm()) {
                try {
                    const formattedUserData = {
                        UserName: this.userData.name,
                        Email: this.userData.email,
                        Password: this.userData.password,
                        Rol: 2
                    };
                    await register(formattedUserData);
                    this.$router.push({ name: 'login' });
                } catch (error) {
                    console.error('Error al registrar:', error);
                    this.error = true;
                    this.errorMessage = 'No se pudo crear la cuenta.';
                }
            }
        },
        switchToLogin() {
            this.$emit('switch-form');
        },
        validateForm(): boolean {
            if (!this.userData.name || !this.userData.email || !this.userData.password) {
                this.error = true;
                this.errorMessage = 'Todos los campos son obligatorios.';
                return false;
            }
            if (this.userData.email && !this.userData.email.includes('@')) {
                this.error = true;
                this.errorMessage = 'Por favor ingrese un correo electrónico válido.';
                return false;
            }
            this.error = false;
            return true;
        }
    },
})

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
