import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Obras from '../views/ObrasView.vue';
import Intranet from '../views/IntranetView.vue';

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
  ],
});

export default router;