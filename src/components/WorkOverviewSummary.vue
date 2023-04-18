<template>
  <div
    v-intersect="setElementInViewport"
    class="flex flex-col p-12 sm:p-5 transition-all duration-1000 ease-in-out items-center text-gray-900 sm:shadow-lg lg:mx-4"
    :class="finalClass"
  >
    <h2 class="text-[35px] mb-2 font-bold">
      {{ translate(work.title) }}
    </h2>
    <div
      class="w-full mb-3 border-b-2 border-[#DF442F]"
    />
    <p class="grow text-center mb-10">
      {{ translate(work.presentation.presentationDescription) }}
    </p>
    <p class="mb-4">
      <span class="text-[#DF442F]">
        {{ translate(work.workState) }}
      </span>
      &nbsp;|&nbsp;
      <Link
        :text="translate('cta.show.details')"
        :link="`/works/${collectionId}/${work.id}`"
      />
    </p>
    <CtaButton
      :text="ctaText"
      class="w-[80%] md:w-[70%]"
      @click="openModal(allowedModalNames.WorkContact , { work: props.work})"
    />
  </div>
</template>

<script setup lang="ts">
  import { inject, computed, ref } from 'vue'
  import { useModal, allowedModalNames } from '../composables/modal'
  import { TranslateKey } from '../localizations/localizations'
  import { CollectionWork } from '../composables/collections'
  import Link from './Link.vue'
  import CtaButton from './CtaButton.vue'
  
  const props = defineProps<{
    collectionId: string
    work: CollectionWork
  }>()

  const translate = inject(TranslateKey, () => '')

  const oneLeft = computed(() => {
    return props.work.presentation.presentationType === 'oneLeft'
  })

  const oneRight = computed(() => {
    return props.work.presentation.presentationType === 'oneRight'
  })  

  const two = computed(() => {
    return props.work.presentation.presentationType === 'twoImages'
  })

  const className = computed(() => {
    if (oneLeft.value) {
      return 'z-[100] w-[100%] h-fit sm:w-[30%] sm:h-[75vh] lg:w-[30vh] lg:h-[30vh]' // sm:items-end
    } else if (oneRight.value) {
      return 'z-[100] w-[100%] h-fit sm:w-[30%] sm:h-[75vh] lg:w-[30vh] lg:h-[30vh]'
    } else if (two.value) {
      return 'z-[100] w-[100%] h-fit sm:w-[30%] sm:h-[75vh] lg:w-[30vh] lg:h-[30vh]'
    } else {
      return ''
    }
  })

  const moveClass = ref<string>('')
  const setElementInViewport = (data: IntersectionObserverEntry[]) => {
    if (data[0].isIntersecting) {
      moveClass.value = 'sm:-translate-y-[35px]'
      setTimeout(() => {
        moveClass.value = ''
      }, 1000)
    } else {
      moveClass.value = ''
    }
  }

  const finalClass = computed(() => {
    return `${className.value} ${moveClass.value} ${props.work.presentation.classNames['main']}`
  })

  const ctaText = computed(() => {
    if (props.work.workState === 'sold') {
      return 'cta.sold.text'
    } else if (props.work.workState === 'available') {
      return 'cta.available.text'
    } else {
      return ''
    }
  })

  const { openModal } = useModal()

</script>
