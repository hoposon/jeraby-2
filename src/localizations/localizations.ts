import { InjectionKey, ref } from 'vue'
import i18next from 'i18next'
import moment from 'moment/min/moment-with-locales'
import { AvailableLocales, LangToLocale, ValidLang, DEFAULT_LOCALE } from './AvailableLocales'



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


const locale = ref<string>('')
const localeLoading = ref<number>(0)

export function useLocalizations() {

  async function loadLanguage(newLocale: string, locSource?: any) {
    try {
      localeLoading.value++
      let messages = {}
      if (locSource) {
        messages = {
          default: locSource
        }
      } else {
        messages = await import(`./loc/${AvailableLocales[newLocale]}/loc.ts`)
      }
        console.log('🚀 ~ loadLanguage ~ messages:', messages)

      i18next.addResourceBundle(AvailableLocales[newLocale], 'translation', messages.default, true, true)
      await i18next.changeLanguage(AvailableLocales[newLocale])

      moment.locale(newLocale)

      locale.value = newLocale

      if (typeof document !== 'undefined') {
        document.querySelector('html')?.setAttribute('lang', locale.value.split('-')[0])
      }

    } finally {
      localeLoading.value--
    }

  }

  // TODO - define loc type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setLocalizations(lang: string, locSource?: any) {
    if (lang && LangToLocale[lang]) {
      if (locale.value === LangToLocale[lang]) {
        return
      }
    }
    //   locale.value = LangToLocale[lang]
    // } else {
    //   locale.value = DEFAULT_LOCALE
    // }
    // loadLanguage(locale.value)
    loadLanguage(LangToLocale[lang], locSource)
  }

  const locPlugin = (lang: string, locSource: any) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      install(app: any) {
        // TODO - define args type
        app.provide(TranslateKey, (key: string, args?: (string | number)[] | TransParams): string => {
          return (i18next.t(key, args) || `${key}`)
        })
        app.provide(MomentKey, moment)
        setLocalizations(lang, locSource)
      }

    }
  }
    
  const isValidLang = (lang: string) => {
    return ValidLang[lang] !== undefined
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
    setLocalizations,
    locPlugin,
    localeLoading,
    isValidLang
  }

}

