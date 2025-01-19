import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import {useOwnComponents} from './plugins/button/ownComponents'
import * as mdijs from '@mdi/js'
import mdiVue from 'mdi-vue/v3'

const pinia = createPinia()
const app = createApp(App)

useOwnComponents(app)
app.use(pinia)
app.use(mdiVue, {
  icons: mdijs
}) 
app.mount('#app')
