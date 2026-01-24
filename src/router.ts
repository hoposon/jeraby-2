import { createRouter, createWebHistory } from 'vue-router'
import { useLocalizations } from './localizations/localizations'
import i18next from 'i18next'
import { ValidLang } from './localizations/AvailableLocales'
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

// Helper to set or update a meta tag
function upsertMeta(name: string, content: string) {
  if (typeof document === 'undefined') return
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Helper to set or update a property meta (for Open Graph / Twitter)
function upsertPropertyMeta(property: string, content: string) {
  if (typeof document === 'undefined') return
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Helper to upsert a link rel tag
function upsertLinkRel(rel: string, href: string, hreflang?: string) {
  if (typeof document === 'undefined') return
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Helper to upsert JSON-LD structured data
function upsertJsonLd(id: string, data: object) {
  if (typeof document === 'undefined') return
  let el = document.querySelector(`script[type="application/ld+json"][data-id="${id}"]`) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.setAttribute('data-id', id)
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

router.afterEach((to) => {
  if (typeof document === 'undefined') return

  const lang = (to.params?.lang as string) || 'cs'
  const baseUrl = (import.meta as any).env?.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
  const fullUrl = `${baseUrl}${to.fullPath}`

  // Derive title and description via i18n keys when possible
  let titleKey = ''
  let descriptionKey = ''

  // Resolve based on path
  if (to.matched.length > 0) {
    const last = to.matched[to.matched.length - 1]
    const path = last.path
    if (path.endsWith(':collection')) {
      titleKey = 'available.works.collection.title'
      descriptionKey = 'available.works.collection.description'
    } else if (path.endsWith(':id')) {
      titleKey = 'workDetails.title'
      descriptionKey = 'workDetails.description'
    } else if (path.endsWith('about')) {
      titleKey = 'about.title'
      descriptionKey = 'about.description'
    } else if (path.endsWith('contact')) {
      titleKey = 'contact.title'
      descriptionKey = 'contact.description'
    } else {
      titleKey = 'home.title'
      descriptionKey = 'home.description'
    }
  }

  const translatedTitle = i18next.t(titleKey) || 'Michaela Houf'
  const translatedDescription = i18next.t(descriptionKey) || 'Michaela Houf – Artist portfolio and works.'

  // Title
  const siteName = 'Michaela Houf'
  document.title = translatedTitle && translatedTitle !== titleKey ? `${translatedTitle} | ${siteName}` : siteName

  // Meta description
  if (translatedDescription && translatedDescription !== descriptionKey) {
    upsertMeta('description', translatedDescription)
  }

  // Canonical
  upsertLinkRel('canonical', fullUrl)

  // Open Graph basics
  upsertPropertyMeta('og:title', document.title)
  upsertPropertyMeta('og:description', translatedDescription)
  upsertPropertyMeta('og:type', 'website')
  upsertPropertyMeta('og:url', fullUrl)

  // Twitter basics
  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:title', document.title)
  upsertMeta('twitter:description', translatedDescription)

  // hreflang alternates for supported languages
  const supportedLangs = Object.values(ValidLang) as string[]
  supportedLangs.forEach((l) => {
    const href = `${baseUrl}/${l}${to.path.replace(/^\/[a-z]{2}/, '')}`
    upsertLinkRel('alternate', href, l)
  })

  // JSON-LD Structured Data
  // WebSite schema - always present
  upsertJsonLd('website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Michaela Houf',
    'url': baseUrl,
    'description': translatedDescription,
    'inLanguage': [lang]
  })

  // Person/Artist schema - for home and about pages
  if (to.matched.length > 0) {
    const last = to.matched[to.matched.length - 1]
    const path = last.path

    if (path === '/:lang' || path.endsWith('about')) {
      upsertJsonLd('person', {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Michaela Houf',
        'url': baseUrl,
        'image': `${baseUrl}/images/home-jerab1.png`,
        'jobTitle': lang === 'cs' ? 'Výtvarná umělkyně' : 'Visual Artist',
        'sameAs': [baseUrl]
      })
    }

    // BreadcrumbList - helps Google understand site structure
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Michaela Houf',
        'item': `${baseUrl}/${lang}`
      }
    ]

    if (path.endsWith('about')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': i18next.t('about.title') || 'About',
        'item': fullUrl
      })
    } else if (path.endsWith('contact')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': i18next.t('contact.title') || 'Contact',
        'item': fullUrl
      })
    } else if (path.endsWith(':collection')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': i18next.t('available.works.collection.title') || 'Works',
        'item': fullUrl
      })
    } else if (path.endsWith(':id')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': i18next.t('workDetails.title') || 'Work',
        'item': fullUrl
      })
    }

    if (breadcrumbItems.length > 1) {
      upsertJsonLd('breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems
      })
    }
  }
})

export default router