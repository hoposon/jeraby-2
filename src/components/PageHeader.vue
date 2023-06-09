<template>
  <div 
    id="id-page-header"
    v-intersect="setHeaderInViewport"
    class="h-[75vh] bg-fixed bg-no-repeat bg-[length:400px_300px] bg-[position:75%_60%] p-1"
    :class="[page.classNames?.bg, page.classNames?.text]"
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
      class="w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mt-4"
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

