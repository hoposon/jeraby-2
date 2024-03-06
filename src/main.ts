import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto/routes'
import App from './App.vue'
import type { UserModule } from './types'

import type { CustomDirective } from './directives'
import directives from './directives'
import { useLocalizations } from './localizations/localizations'
import cs from './localizations/loc/cs/loc'
import { useScrollHistory } from './composables/scrollHistory'

import './styles/main.css'

const { initLocalizations, changeLocale, locale } = useLocalizations()
const { setScrollHistory, getScrollHistory } = useScrollHistory()

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

    // ctx.router guards
    ctx.router.beforeEach(async (to, from) => {

      if (typeof window !== 'undefined') {
        setScrollHistory(from.path, window.scrollY)
      }

      if (to.params.lang && to.params.lang !== locale.value) {
        changeLocale(to.params.lang as string)
        return
      }
    })

    ctx.router.afterEach((to, from) => {
      if (typeof window !== 'undefined') {
        const scroll = getScrollHistory(to.path)
        if (scroll) {
          window.scrollTo(0, scroll.scroll)
        } else {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 50)
        }
      }
    })

    directives.forEach((directive: CustomDirective) => {
      ctx.app.directive(directive.name, directive)
    })
  },
    
)
