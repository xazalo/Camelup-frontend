import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'
import i18n from '@/locales'

//load fonts
import '@fontsource/fredoka/300.css'
import '@fontsource/fredoka/400.css'
import '@fontsource/fredoka/500.css'
import '@fontsource/fredoka/600.css'
import '@fontsource/fredoka/700.css'

import '@fontsource/nunito/200.css'
import '@fontsource/nunito/300.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/500.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import '@fontsource/nunito/900.css'

import '@fontsource/nunito/200-italic.css'
import '@fontsource/nunito/300-italic.css'
import '@fontsource/nunito/400-italic.css'
import '@fontsource/nunito/500-italic.css'
import '@fontsource/nunito/600-italic.css'
import '@fontsource/nunito/700-italic.css'
import '@fontsource/nunito/800-italic.css'
import '@fontsource/nunito/900-italic.css'

//load css
import "@/assets/css/reset.css"
import "@/assets/css/typography.css"
import "@/assets/css/colors.css"
import "@/assets/css/design-tokens.css"
import "@/assets/css/globals.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')