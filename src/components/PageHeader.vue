<template>
  <div 
    id="id-page-header"
    v-intersect="setHeaderInViewport"
    class="h-[75vh] bg-no-repeat bg-[length:150px_150px] sm:bg-[length:200px_180px] md:bg-[length:250px_210px] 2xl:bg-[length:400px_300px] lowh:bg-[length:150px_150px] lowh:bg-[position:85%_55%] p-[10vw]"
    :class="[page.classNames?.bg, page.classNames?.text, isiOS ? 'bg-scroll bg-[position:80%_85%]' : 'bg-fixed bg-[position:80%_60%]']"
    :style="{'background-image': 'url(' + page.bgImage + ')' }"
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
    <BurgerButton
      v-if="navState === 'closed'"
      class="absolute top-10 right-10 w-[40px]"
      :color="page.classNames?.menuColor"
    />
  </div>
</template>

<script setup lang="ts">
  import { inject, ref, onMounted, watch } from 'vue'
  import { useNavigation } from '../composables/navigation'
  import BurgerButton from '../components/BurgerButton.vue'
  import { PageHeader } from '../types'
  import HomeButton from './HomeButton.vue'
  import { TranslateKey } from '../localizations/localizations'
  import { useTextScramble } from '../composables/textScramble'

  const props = defineProps<{
    page: PageHeader
  }>()

  const translate = inject(TranslateKey, () => '')
  const { setHeaderInViewport, navState } = useNavigation()

  

  const titleEl = ref<HTMLElement|null>(null)
  const descriptionEl = ref<HTMLElement|null>(null)

  const isiOS = ref<boolean>(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)

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
</style>

