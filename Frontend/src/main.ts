import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que esta importación apunte a tu archivo de configuración del router

const app = createApp(App);
app.use(router); // Utiliza el plugin router que has configurado
app.mount('#app'); 