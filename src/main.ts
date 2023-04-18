import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import directives, { CustomDirective } from './directives'
import { useLocalizations } from './localizations/localizations'
import en from './localizations/loc/en/loc'

const { initLocalizations } = useLocalizations()

const app = createApp(App)
app.use(router)
app.use(initLocalizations(en))


directives.forEach((directive: CustomDirective) => {
  app.directive(directive.name, directive)
})

app.mount('#app')

