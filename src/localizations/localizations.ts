import type {InjectionKey} from 'vue'
import { ref } from 'vue'
import i18next from 'i18next'
import moment from 'moment/min/moment-with-locales'
import { AvailableLocales, DEFAULT_LOCALE } from './AvailableLocales'



interface TransParams {
  [key: string]: number | string | { [key: string]: boolean }
}
export type TranslateFn = (key: string, args?: (string | number | { [key: string]: boolean })[] | TransParams) => string
export const TranslateKey: InjectionKey<TranslateFn> = Symbol('translate')

export type MomentFn = (args: unknown) => unknown
export const MomentKey: InjectionKey<MomentFn> = Symbol('moment')

export const DEFAULT_LANGUAGE = AvailableLocales[DEFAULT_LOCALE]

interface Resources {
  [key: string]: {
    [key: string]: {
      [key: string]: string
    }
  }
}
const resources: Resources = {}
resources[DEFAULT_LANGUAGE] = {
  translation: {
    'global.ready': 'ready'
  }
}

// init i18n
i18next.init({
  lng: DEFAULT_LANGUAGE,
  debug: false,
  keySeparator: false,
  fallbackLng: DEFAULT_LANGUAGE,
  compatibilityJSON: 'v4',
  resources
}, function (err, t) {
  // initialized and ready to go!
  // todo: try to solve handling of expections better
  // eslint-disable-next-line no-console
  err ? console.log(err) : console.log('i18next:', t('global.ready'))
})

// set current locale
moment.locale(DEFAULT_LANGUAGE)


const locale = ref<string>(DEFAULT_LOCALE)
const localeLoading = ref<number>(0)

export function useLocalizations() {

  async function loadLanguage(newLocale: string) {
    try {
      localeLoading.value++
      const messages = await import(`./loc/${AvailableLocales[newLocale]}/loc.ts`)

      await i18next.changeLanguage(AvailableLocales[newLocale])
      i18next.addResourceBundle(AvailableLocales[newLocale], 'translation', messages.default || messages, true, true)

      moment.locale(newLocale)

      locale.value = newLocale

      console.log('🚀 ~ loadLanguage ~ document:', document)
      if (typeof document !== 'undefined') {
        document.querySelector('html')?.setAttribute('lang', locale.value)
      }

    } finally {
      localeLoading.value--
    }

  }

  async function changeLocale(newLocale: string) {
    loadLanguage(newLocale)
  }

  // TODO - define loc type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function initLocalizations(loc: any) {

    locale.value = DEFAULT_LOCALE // TODO - get from browser

    // set loc resources
    i18next.addResourceBundle(DEFAULT_LANGUAGE, 'translation', loc, true, true)

    const locPlugin = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      install(app: any) {
        // TODO - define args type
        app.provide(TranslateKey, (key: string, args?: (string | number)[] | TransParams): string => {
          return (i18next.t(key, args) || `${key}`)
        })
        app.provide(MomentKey, moment)
      }
    }

    if (locale.value !== DEFAULT_LOCALE) {
      loadLanguage(locale.value)
    }

    return locPlugin
  }

  // const formatPrice = (priceValue: number, priceCurrency: string, priceLocale: string = locale.value) => {
  //   return new Intl.NumberFormat(priceLocale, {
  //     style: 'currency',
  //     currency: priceCurrency,
  //     currencyDisplay: 'narrowSymbol',
  //   }).format(priceValue)
  // }

  return {
    locale,
    initLocalizations,
    localeLoading,
    changeLocale
  }

}

