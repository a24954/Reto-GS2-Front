<template>
    <header>
        <nav>
            <input type="checkbox" id="check">
            <label for="check" class="checkbtn">
                <i class="fa-solid fa-bars"></i>
            </label>
            <div class="logo-container">
                <a class="enlace"><img src="../../Imagenes/Logo.png" alt="" class="logo"></a>
            </div>
            <ul>
                <li><router-link to="/">INICIO</router-link></li>
                <li><router-link to="/Obras">OBRAS</router-link></li>
                <li><router-link to="/Reservas">RESERVAS</router-link></li>
                <li v-if="isLoggedIn" @click="logout"><router-link to="/">CERRAR SESION</router-link></li>
                <li v-else><router-link to="/Login">INICIAR SESIÓN</router-link></li>
            </ul>
        </nav>
        <section></section>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const router = useRouter();
        const isLoggedIn = ref(false);

        function checkLoginStatus() {
            const user = localStorage.getItem('currentUser');
            isLoggedIn.value = !!user; 
        }

        function logout() {
            localStorage.removeItem('currentUser');
            isLoggedIn.value = false;
            router.push('/'); 
        }

        checkLoginStatus();

        return { isLoggedIn, logout };
    },
});
</script>

<style scoped>
.logo-container {
    position: relative;
}

.logo-container:hover .logo {
    animation: spin 1s infinite linear;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

nav {
    background: #C09057;
    height: 80px;
    width: 100%;
}

.enlace {
    position: absolute;
    padding: 10px 20px;
}

.logo {
    width: 120px;
    height: 60px;
}

nav ul {
    float: right;
    margin-right: 20px;
}

nav ul li {
    display: inline-block;
    line-height: 80px;
    margin: 0 5px;
}

nav ul li a {
    color: #000000;
    font-size: 25px;
    padding: 7px 13px;
    border-radius: 3px;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
}

li a.active,
li a:hover {
    background: #6F1D1D;
    transition: 0.5s;
}

.checkbtn {
    font-size: 30px;
    color: #fff;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
}

#check {
    display: none;
}

@media (max-width: 952px) {
    nav ul li a {
        font-size: 16px;
        border: 2px solid #C09057;
        border-radius: 30%;
        background-color: #C09057;
        padding-left: 20%;
        padding-right: 20%;
    }
}

@media (max-width: 858px) {
    .checkbtn {
        display: block;
    }

    ul {
        position: absolute;
        width: 100%;
        background: #000000;
        top: 80px;
        left: -100%;
        text-align: center;
        transition: all 0.5s;
    }

    nav ul li {
        display: block;
        margin: 50px 0;
        line-height: 30px;
    }

    nav ul li a {
        font-size: 20px;
        color: #6F1D1D;
    }

    #check:checked~ul {
        left: 0;
        z-index: 100;
    }
}
</style>
