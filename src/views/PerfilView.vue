<template>
    <Navbar />
    <div class="auth-wrapper">
        <div class="auth-container">
            <Login v-if="!showRegister" @switch-form="toggleForm" />
            <Register v-if="showRegister" @switch-form="toggleForm" />
        </div>
    </div>
    <Footer />
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PerfilView',
    components: {
        Navbar,
        Login,
        Register,
        Footer,
    },
    data() {
        return {
            showRegister: false
        };
    },
    methods: {
        toggleForm() {
            this.showRegister = !this.showRegister; 
        },
        handleSwitchForm() {
        },
        showRegisterForm() {
            this.$router.push('/register');
        },
    }
});
</script>


<style scoped>
body {
    background: #C09057;
    color: #333;
}

.auth-wrapper {
    padding: 5vh 0;
    background: #F0EAD6;
}

.auth-container {
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

input[type="email"],
input[type="password"] {
    background: #fff;
    color: #333;
}

button {
    background-color: #59A96A;
    color: #fff;
}

button:hover {
    background-color: #4C8C56;
}

a {
    color: #59A96A;
    text-decoration: none;
}

a:hover {
    color: #4C8C56;
}

.auth-container,
.auth-wrapper {
    padding: 100px;
    margin: auto;
}

h1,
h2,
h3,
p {
    margin-bottom: 1em;
}
</style>