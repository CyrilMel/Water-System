import './assets/main.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios'
import VueFeather from 'vue-feather';

const app = createApp(App)

app.use(router)
app.component(VueFeather.name, VueFeather)
app.mount('#app')
