<template>
    <div id="carouselExampleFade" class="carousel slide carousel-fade slidercolor">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../Imagenes/slider2.png" class="d-block w-100" alt="..." style="object-fit: cover;">
            </div>
            <div class="carousel-item">
                <img src="../../Imagenes/slider1.webp" class="d-block w-100" alt="..." style="object-fit: cover;">
            </div>
            <div class="carousel-item">
                <img src="../../Imagenes/slider3.png" class="d-block w-100" alt="..." style="object-fit: cover;">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script lang="ts">
import * as bootstrap from 'bootstrap';

export default {
    name: 'HomeSlider',
    mounted() {
        const myCarouselElement = document.querySelector('#carouselExampleFade');
        if (myCarouselElement) {
            const carousel = new bootstrap.Carousel(myCarouselElement, {
                interval: 2000,
                touch: false
            });
        }
    }
};
</script>

<style>
* {
    box-sizing: border-box;
}

.slidercolor {
    background-color: black;
    /* Fondo del slider si es necesario */
}

#carouselExampleFade .carousel-item img {
    height: 1200px;
    /* Altura de las imágenes del slider */
    object-fit: cover;
    /* Asegúrate de que las imágenes cubran el elemento */
}

.carousel-control-prev,
.carousel-control-next {
    color: #fff;
    /* Color de los botones de control */
}

/* Media queries para ajustes responsivos del slider */
@media (max-width: 952px) {
    #carouselExampleFade .carousel-item img {
        height: 700px;
    }
}

@media (max-width: 858px) {
    #carouselExampleFade .carousel-item img {
        height: 600px;
    }
}

@media (max-width: 450px) {
    #carouselExampleFade .carousel-item img {
        height: 290px;
    }
}</style>
