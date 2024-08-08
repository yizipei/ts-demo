import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import "vue-keyboard-virtual-next/keyboard.min.css"
import keyBoard from "vue-keyboard-virtual-next"

import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(keyBoard)

app.config.globalProperties.$msg = 'tt hh'

app.mount('#app')

export default {
  app: app
}
