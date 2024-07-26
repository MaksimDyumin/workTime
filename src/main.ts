import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import {useOwnComponents} from './plugins/button/ownComponents'

const pinia = createPinia()
const app = createApp(App)

useOwnComponents(app)
app.use(pinia)
app.mount('#app')
