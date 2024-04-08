<template>
    <div>
        <div class="tituloObrasDestacadas">
            <h1>OBRAS DESTACADAS</h1>
        </div>
        <section class="section1">
            <div class="container text-center">
                <div class="row">
                    <div class="col" v-for="obra in obras" :key="obra.titulo">
                        <img :src="obra.imagen" class="imgObrasDestacadas img-fluid" alt="">
                        <h2 class="tituloDeObras">{{ obra.titulo }}</h2>
                        <a class="boton"><router-link to="/Obras">OBRAS</router-link></a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import obra1 from '../../Imagenes/obra1.png';
import obra2 from '../../Imagenes/obra2.png';
import obra3 from '../../Imagenes/obra3.png';
import obra4 from '../../Imagenes/obra4.png';

export default {
    name: 'ObrasHome',
    data() {
        return {
            obras: [
                { titulo: 'EL LABERINTO DEL FAUNO', imagen: obra1 },
                { titulo: 'EL CLUB DE LA LUCHA', imagen: obra2 },
                { titulo: 'LA NOCHE ESTRELLADA', imagen: obra3 },
                { titulo: '1984 PRUEBA DE OBRA', imagen: obra4 }
            ]
        }
    }
}
</script>

<style scoped>
.tituloObrasDestacadas {
    font-family: "Roboto", sans-serif;
    color: #6F1D1D;
    background-color: #C09057;
    text-align: center;
    padding-top: 2%;
    padding-bottom: 2%;
    border: 15px solid black;
    margin-bottom: -5%;
}

.section1 {
    margin-top: 5%;
    margin-bottom: 5%;
    background-color: #6F1D1D;
    padding-top: 10%;
    padding-bottom: 10%;
    border: 10px solid black;
}

.imgObrasDestacadas {
    border: 10px solid black;
    border-radius: 5%;
    width: 100%;
    height: auto;
}

.tituloDeObras {
    font-family: "Roboto", sans-serif;
    color: black;
}

.boton {
    background-color: #C09057;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 25px;
    font-family: "Roboto", sans-serif;
    text-decoration: none;
    color: #000;
    font-size: 120%;;
}

.col {
    margin-bottom: 4%;
}
</style>
