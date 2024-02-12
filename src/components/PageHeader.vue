<template>
  <div 
    id="id-page-header"
    v-intersect="setHeaderInViewport"
    class="h-[75vh] bg-none sm:bg-main-crane bg-no-repeat sm:bg-[length:200px_180px] md:bg-[length:250px_210px] 2xl:bg-[length:400px_300px] lowh:bg-[length:150px_150px] lowh:bg-[position:85%_55%] p-[10vw] bg-position-scroll-fixed"
    :class="[page.classNames?.bg, page.classNames?.text]"
  >
    <HomeButton 
      v-if="navState === 'closed'"
    /> 
    <h1
      ref="titleEl"
      :class="page.classNames?.title"
    />
    <p
      v-if="page.description"
      ref="descriptionEl"
      class="lowh:w-[50%] w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mt-4 lowh:text-lg"
      :class="page.classNames?.description"
    >
      {{ translate(page.description) }}
    </p>
    <div
      v-if="page.text1"
      class="lowh:w-[50%] w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] pr-8"
      :class="page.classNames?.text1"
    >
      {{ translate(page.text1) }}
    </div>
    <BurgerButton
      v-if="navState === 'closed'"
      class="absolute top-10 right-10 w-[40px]"
      :color="page.classNames?.menuColor"
    />
  </div>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref, watch } from 'vue'
  import { useNavigation } from '../composables/navigation'
  import type { PageHeader } from '../types'
  import { TranslateKey } from '../localizations/localizations'
  import { useTextScramble } from '../composables/textScramble'
  import BurgerButton from './BurgerButton.vue'
  
  // import HomeButton from './HomeButton.vue'

  const props = defineProps<{
    page: PageHeader
  }>()

  const translate = inject(TranslateKey, () => '')
  const { setHeaderInViewport, navState } = useNavigation()

  

  const titleEl = ref<HTMLElement|null>(null)
  const descriptionEl = ref<HTMLElement|null>(null)

  onMounted(() => {
    if (!titleEl.value) {
      return
    }
    useTextScramble(titleEl.value, translate(props.page.title))

    if (!descriptionEl.value) {
      return
    }
    useTextScramble(descriptionEl.value, translate(props.page.description))
  })

  watch(
    () => props.page.title,
    (title) => {
      if (!titleEl.value) {
        return
      }
      useTextScramble(titleEl.value, translate(title))
      if (!descriptionEl.value) {
        return
      }
      useTextScramble(descriptionEl.value, translate(props.page.description))
    }
  )

</script>

<style>
  .dud {
    color: #757575;
  }

  .bg-position-scroll-fixed {
      background-attachment: fixed;
      background-position: 80% 60%;
    }
  @supports (background-attachment: scroll) {
    .bg-position-scroll-fixed {
      background-attachment: scroll;
      background-position: 80% 85%;
    }
  }
</style>

