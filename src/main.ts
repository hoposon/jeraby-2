import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import directives, { CustomDirective } from './directives'
import { useLocalizations } from './localizations/localizations'
import cs from './localizations/loc/cs/loc'

const { locPlugin } = useLocalizations()

const app = createApp(App)
app.use(router)
app.use(locPlugin(cs))


directives.forEach((directive: CustomDirective) => {
  app.directive(directive.name, directive)
})

app.mount('#app')

