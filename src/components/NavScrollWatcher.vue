<template>
  <div
    id="nav-scroll-watcher"
    class="fixed flex w-full z-[10000] h-[55px] bg-gray-900 text-neutral-300 items-center transition-all duration-300 ease-in-out"
    :class="[navScrollClassNames]"
  >
    <router-link
      v-if="showPrevButton"
      :to="showPrevButton"
      class="ml-4 flex items-center transition-all duration-300 ease-in-out hover:scale-[1.1]"
    >
      <ArrowLeftRigt left />
      <span
        class="-ml-1"
      >
        {{ translate('nav.prev.work') }}
      </span>
    </router-link>
    <div class="mx-auto flex items-center">
      <BurgerButton 
        class="w-[35px] mr-5"
        bar-height="lg"
        color="bg-neutral-300"
      />
      <ScrollButton />
    </div>
    <router-link
      v-if="showNextButton"
      :to="showNextButton"
      class="-mr-1 transition-all duration-300 ease-in-out hover:scale-[1.1]"
    >
      <span
        class="mr-4"
      >
        {{ translate('nav.next.work') }}
      </span>
      <ArrowLeftRigt right />
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useScroll } from '../composables/scroll'
  import { useNavigation } from '../composables/navigation'
  import { useCollections } from '../composables/collections'
  import { inject, computed } from 'vue'
  import { TranslateKey } from '../localizations/localizations'
  import BurgerButton from './BurgerButton.vue'
  import ScrollButton from './ScrollButton.vue'
  import ArrowLeftRigt from './ArrowLeftRigt.vue'

  const { subscribe } = useScroll()
  const { navScrollClassNames, handleScroll } = useNavigation()
  const route = useRoute()
  const { getCollection } = useCollections()
  const translate = inject(TranslateKey, () => '')

  subscribe(handleScroll)

  const showNextButton = computed(() => {
    if (!route.params.collection || !route.params.id) return false

    const collection = getCollection(route.params.collection)
    const workIndex = collection[0].publishedCollectionWorks.findIndex(work => work.id === route.params.id)
    if (workIndex !== -1 && workIndex < collection[0].publishedCollectionWorks.length-1) {
      return `/works/${route.params.collection}/${collection[0].publishedCollectionWorks[workIndex+1].id}`
    } else {
      return false
    }
  })

  const showPrevButton = computed(() => {
    if (!route.params.collection || !route.params.id) return false
    
    const collection = getCollection(route.params.collection)
    const workIndex = collection[0].publishedCollectionWorks.findIndex(work => work.id === route.params.id)    
    if (workIndex !== -1 && workIndex > 0) {
      return `/works/${route.params.collection}/${collection[0].publishedCollectionWorks[workIndex-1].id}`
    } else {
      return false
    }
  })

  const className = computed(() => {
    if (showNextButton.value === false && showPrevButton.value === false) return 'justify-center'
    else return 'justify-between'
  })




</script>