import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@/assets/js/minecraft-color-codes.min.3.7'

createApp(App).use(router).mount('#app')
