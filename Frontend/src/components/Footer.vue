<template>
    <footer class="footer">
        <div class="container text-center">
            <div class="row">
                <div class="col">
                    <img class="imgObrasDestacadas" src="../../Imagenes//Logo.png" alt="Logo">
                </div>
                <div class="col">
                    <h1>HORARIOS</h1>
                    <p>
                        HORARIOS TAQUILLA:
                        De miércoles a sábado de 18h a 21h .
                        De lunes a viernes de 9h-14h y 17h-22h.
                        Sábados y domingos de 10h a 14h y 17h a 22h.
                    </p>
                </div>
                <div class="col">
                    <h1>INFORMACIÓN</h1>
                    <p>
                        +976-70115339
                        tickgenius@info.com
                        Vía Univérsitas 30-32, esquina con Duquesa Villahermosa
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script lang="ts">
export default {
    name: 'AppFooter',
};
</script>
  
<style scoped>
.footer {
    margin-top: -5%;
    padding-top: 10%;
    background-color: #C09057;
    padding-bottom: 8%;
    color: #000;
    /* Asegúrate de definir un color de texto si es necesario */
}

.imgObrasDestacadas {
    border: 10px solid black;
    border-radius: 5%;
    width: 100%;
    height: auto;
}

/* Puedes añadir aquí más estilos específicos para el footer si es necesario */
</style>
