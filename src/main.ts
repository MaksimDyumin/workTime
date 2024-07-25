import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import Button from './plugins/button/button'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Button)
app.mount('#app')
