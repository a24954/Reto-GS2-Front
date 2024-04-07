import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Obras from '../views/ObrasView.vue';
import Intranet from '../views/IntranetView.vue';
import ObrasIntranet from '../views/ObrasIntranetView.vue';
import Reservas from '../components/Reservas.vue';
import Perfil from '../views/PerfilView.vue';
import DetallesObraView from '../views/DetallesObraView.vue';
import UsuarioView from '../views/UsuarioIntranetView.vue';
import SesionView from '../views/SesionesIntranetView.vue'

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
      path: '/usuarioview',
      name: 'UsuarioView',
      component: UsuarioView
    },
    {
      path: '/sesionview',
      name: 'SesionView',
      component: SesionView,
    },
    {
      path: '/reservas',
      name: 'Reservas',
      component: Reservas
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/detalles-obra/:idPlay',
      name: 'DetallesObra',
      component: DetallesObraView,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/PerfilView.vue') 
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/PerfilView.vue') 
    },
  ],
});

export default router;