import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto/routes'
import App from './App.vue'
import type { UserModule } from './types'

import type { CustomDirective } from './directives'
import directives from './directives'
import { useLocalizations } from './localizations/localizations'

import cs from './localizations/loc/cs/loc'

import './styles/main.css'

const { initLocalizations, changeLocale, locale } = useLocalizations()

routes.unshift(
  {
    path: '/',
    redirect: '/cs',
  },
)

routes.push(
  {
    path: '/:pathMatch(.*)*',
    redirect: '/cs',
  },
)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes, //: layoutRoutes,
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)

    ctx.app.use(initLocalizations(cs))

    // ctx.router guard
    ctx.router.beforeEach(async (to) => {
      if (to.params.lang && to.params.lang !== locale.value) {
        changeLocale(to.params.lang as string)
        return
      }
      // window.scrollTo({
      //   top: 0,
      //   // behavior: 'smooth' // You can change this to 'auto' for instant scrolling
      // });
    })

    directives.forEach((directive: CustomDirective) => {
      ctx.app.directive(directive.name, directive)
    })
  },
    
)
