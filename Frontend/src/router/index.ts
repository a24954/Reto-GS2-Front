import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Obras from '../views/ObrasView.vue';
import Intranet from '../views/IntranetView.vue';
import ObrasIntranet from '../views/ObrasIntranetView.vue';
import Reservas from '@/components/Reservas.vue';

const router = createRouter({
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
      component: Obras 
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
    {
      path: '/reservas',
      name: 'Reservas',
      component: Reservas
    },
  ],
});

export default router;