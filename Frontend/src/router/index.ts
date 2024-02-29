import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Obras from '../views/ObrasView.vue';
import Intranet from '../views/IntranetView.vue';
import ObrasIntranet from '../views/ObrasIntranetView.vue';

const router = createRouter({
  // process.env.BASE_URL debería ser la URL base de tu aplicación, por ejemplo '/'
  // Si no tienes una variable de entorno configurada, puedes poner directamente '/'
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/obras',
      name: 'Obras',
      component: Obras // Agrega la ruta para Obras
    },
    {
      path: '/intranet',
      name: 'Intranet',
      component: Intranet
    },
    {
      path: '/obrasintranet',
      name: 'ObrasIntranet',
      component: ObrasIntranet
    },
  ],
});

export default router;