<template>
  <!-- <div
    class="h-full sm:h-[40vh] md:h-[46vh] lg:h-[60vh] xl:h-[70vh] relative"
  > -->
  <div
    v-resize="evaluateIsMobile"
    class="relative flex flex-col h-[100vh] sm:flex-row sm:h-[90vh]"
    :class="[alignClass]"
  >
    <div
      v-if="oneLeft || two"
      class="sm:shadow-2xl overflow-hidden"
      :class="finalClass['imgOne']"
    >
      <img
        v-intersect="(data: IntersectionObserverEntry[]) => setElementInViewport(data, 'imgOne')"
        v-isloaded="() => {makeItVisible('imgOne')}"
        :src="work.presentation.presentationImages[0].imgPath"
        :alt="work.presentation.presentationImages[0].imgAlt"
        class="object-cover transition-all origin-center duration-[3000ms] ease-in w-full h-[100%]"
        :class="moveClass['imgOne']"
      >
    </div>
    <WorkOverviewSummary
      :collection-id="collectionId"
      :work="work"
    />
    <div
      v-if="oneRight || two"
      class="sm:shadow-2xl overflow-hidden"
      :class="finalClass['imgTwo']"
    >
      <img
        v-intersect="(data: IntersectionObserverEntry[]) => setElementInViewport(data, 'imgTwo')"
        v-isloaded="() => {makeItVisible('imgTwo')}"
        :src="work.presentation.presentationImages[1].imgPath"
        :alt="work.presentation.presentationImages[1].imgAlt"
        class="object-cover transition-all origin-center duration-[3000ms] ease-in w-full h-[100%]"
        :class="moveClass['imgTwo']"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { CollectionWork } from '../composables/collections'
  import WorkOverviewSummary from './WorkOverviewSummary.vue'

  const props = defineProps<{
    collectionId: string
    work: CollectionWork,
    index: number
  }>()

  const isMobile = ref<boolean>(false)

  const evaluateIsMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 640px)').matches
  }

  const oneLeft = computed(() => {
    return props.work.presentation.presentationType === 'oneLeft' || isMobile.value
  })

  const oneRight = computed(() => {
    return props.work.presentation.presentationType === 'oneRight' && !isMobile.value
  })  

  const two = computed(() => {
    return props.work.presentation.presentationType === 'twoImages'
  })

  const imgOneClassName = computed(() => {
    if (oneLeft.value) {
      return 'w-full max-h-[60vh] h-[60vh] sm:w-[70%] sm:max-h-[75vh] sm:h-[75vh] lg:w-[60%] xl:w-[50%]'
    } else if (oneRight.value) {
      return 'w-full h-[60vh] sm:hidden'
    } else if (two.value) {
      return 'w-full max-h-[60vh] sm:w-[70%] sm:max-h-[75vh] sm:h-[75vh] lg:w-[15%] xl:w-[15%]'
    } else {
      return ''
    }
  })

  const imgTwoClassName = computed(() => {
    if (oneLeft.value) {
      return 'hidden'
    } else if (oneRight.value) {
      return 'hidden sm:block sm:w-[70%] sm:max-h-[75vh] sm:h-[75vh] lg:w-[60%] xl:w-[50%]'
    } else if (two.value) {
      return 'hidden lg:block lg:w-[60%] lg:max-h-[75vh] lg:h-[75vh] xl:w-[55%]'
    } else {
      return ''
    }
  })

  type MoveClass = {
    [key: string]: string
  }
  const moveClass = ref<MoveClass>({
    'imgOne': '',
    'imgTwo': ''
  })

  const setElementInViewport = (data: IntersectionObserverEntry[], element: string) => {
    if (data[0].isIntersecting) {
      moveClass.value[element] = 'scale-[1.2]'//'sm:-translate-y-[45px]'
    } else {
      moveClass.value[element] = ''
    }
  }

  type InvisibleClass = {
    [key: string]: string
  }
  const invisibleClass = ref<InvisibleClass>({
    'imgOne': 'opacity-0',
    'imgTwo': 'opacity-0'
  })
  const makeItVisible = (element: string) => {
    invisibleClass.value[element] = 'opacity-100'
  }

  const finalClass = computed(() => {
    return {
      'imgOne': `${imgOneClassName.value} ${invisibleClass.value['imgOne']}`,
      'imgTwo': `${imgTwoClassName.value} ${invisibleClass.value['imgTwo']}`
    }
  })

  const alignClass = computed(() => {
    if (two.value) {
      return 'sm:items-center lg:justify-start'
    } else {
      return 'sm:items-center lg:justify-center'
    }
  })

</script>