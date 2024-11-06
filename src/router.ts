import { createRouter, createWebHistory } from 'vue-router'
import { useLocalizations } from './localizations/localizations'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Collection from './views/Collection.vue'
import WorkDetail from './views/WorkDetail.vue'

// const routes = [
//   { path: '/', component: Home },
//   { path: '/about', component: About },
//   { path: '/contact', component: Contact },
//   { path: '/works/:collection', component: Collection },
//   { path: '/work/:id', component: WorkDetail },
//   { path: '/:pathMatch(.*)*', name: 'NotFound', component: Home },
// ]
const { setLocalizations, isValidLang } = useLocalizations()

const routes = [
  {
    path: '/',
    redirect: '/cs'  // Redirect to a default language, e.g., 'en'
  },
  {
    path: '/:lang',
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'works/:collection', component: Collection },
      { path: 'work/:id', component: WorkDetail },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: Home },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  if (to.params && to.params.lang) {
    if (!isValidLang(to.params.lang)) {
      return {path: '/'}
    }
    setLocalizations(to.params.lang)
  }
  // ...
  // explicitly return false to cancel the navigation
  // return false
})

export default router