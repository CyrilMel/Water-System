import './assets/main.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './axios'
import VueFeather from 'vue-feather';

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.component(VueFeather.name, VueFeather)
app.mount('#app')
