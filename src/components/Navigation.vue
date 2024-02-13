<template>
  <Transition name="fade">
    <nav
      class="fixed flex w-full h-full lowh:w-full lowh:h-full md:h-[35vh] z-[10000] justify-center pl-[10vw] md:pr-[20%] xl:pr-[30%] lowh:pt-[25vh] pt-[10vh] bg-neutral-300 md:bg-neutral-300/90 transition-all duration-500 ease-in-out"
      :class="navClassNames"
    >
      <div
        class="flex flex-col md:flex-row w-full md:justify-between text-gray-900"
      >
        <div>
          <HomeButton 
            addClass="hover:bg-home-icon-red"
          />
          <Link
            :text="'Michaela Houf'"
            :link="`/${locale}`"
            class="text-[25px] font-bold mt-8 md:mt-0 md:mr-[80px] whitespace-nowrap"
            @click="closeNav()"
          />
        </div>
        <div class="flex flex-col md:flex-row md:space-x-[80px] md:mt-2">
          <div class="flex flex-col mt-6 md:mt-0">
            <div 
              class="flex items-center text-gray-900/60 after:content-[''] after:inline-block after:w-[25px] after:h-[1px] after:bg-gray-900/60 after:ml-2"
            >
              {{ translate('nav.works') }}
            </div>
            <div class="mt-1">
              <div
                class="ml-16 md:ml-0"
              >
                <Link
                  :text="translate('nav.available.works')"
                  :link="`/${locale}/works/available`"
                  @click="closeNav()"
                />
              </div>
              <div
                class="ml-16 md:ml-0"
              >
                <Link
                  :text="translate('nav.unavailable.works')"
                  :link="`/${locale}/works/unavailable`"
                  @click="closeNav()"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-6 md:mt-0">
            <div class="flex items-center text-gray-900/60 after:content-[''] after:inline-block after:w-[25px] after:h-[1px] after:bg-gray-900/60 after:ml-2">
              {{ translate('nav.menu') }}
            </div>
            <div class="flex flex-col mt-1 ml-16 md:ml-0">
              <div>
                <Link
                  :text="translate('nav.about')"
                  :link="`/${locale}/about`"
                  class="mt-1"
                  @click="closeNav()"
                />
              </div>
              <div>
                <Link
                  :text="translate('nav.contact')"
                  :link="`/${locale}/contact`"
                  @click="closeNav()"
                />
              </div>
              <div>
              <LinkButton
                text="CS"
                :addClass="locale==='cs'?'text-[#DF442F]':''"
                :disabled="locale==='cs'"
                @click="changeLanguage('cs')"
              />
              |
              <LinkButton
                text="EN"
                :addClass="locale==='en'?'text-[#DF442F]':''"
                :disabled="locale==='en'"
                @click="changeLanguage('en')"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
      <button 
        class="absolute top-[3rem] right-10 bg-close-default hover:bg-close-hover bg-center bg-cover w-10 h-10 transition-all duration-200 ease-in-out"
        @click="closeNav()"
      />
    </nav>
  </Transition>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { useRoute, useRouter } from 'vue-router/auto'
  import { useNavigation } from '../composables/navigation'
  import { TranslateKey, useLocalizations } from '../localizations/localizations'
  import Link from './Link.vue'
  import HomeButton from './HomeButton.vue'
  import LinkButton from './LinkButton.vue'

  const { 
    navClassNames,
    closeNav 
  } = useNavigation()

  const { locale } = useLocalizations()

  const route = useRoute()
  const router = useRouter()

  const changeLanguage = (lang: string) => {
    router.push({ name: route.name, params: { ...route.params, lang } })
    setTimeout(() => {
      closeNav()
    }, 100)
    
  }

  

  const translate = inject(TranslateKey, () => '')

</script>