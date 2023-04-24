<template>
  <div
    class="flex flex-col justify-between p-12 sm:p-5 transition-all duration-1000 ease-in-out items-start text-gray-900"
    :class="finalClass"
  >
    <div>
      <h2 class="text-3xl sm:text-5xl mb-2 font-medium text-[#DF442F]">
        {{ translate(work.title) }}
      </h2>
      <!-- <div
        class="w-full mb-3 border-b-2 border-[#DF442F]"
      /> -->
      <p class="text-2xl lg:text-3xl sm:mb-8">
        {{ translate(work.presentation.presentationDescription) }}
      </p>
    </div>
    <div class="w-full">
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
        class="w-[80%] md:w-[70%] lg:w-[50%]"
        @click="openModal(allowedModalNames.WorkContact , { work: props.work})"
      />
    </div>
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
      return 'z-[100] w-[100%] min-h-[40vh] sm:ml-10 sm:mr-10 sm:w-[40%] lg:min-h-[30vh] lg:w-[30%]' // sm:items-end
    } else if (oneRight.value) {
      return 'z-[100] w-[100%] min-h-[40vh] sm:ml-10 sm:mr-10 sm:w-[40%] lg:min-h-[30vh] lg:w-[30%]'
    } else if (two.value) {
      return 'z-[100] w-[100%] min-h-[40vh] sm:ml-10 sm:mr-10 sm:w-[40%] lg:min-h-[30vh] lg:w-[30%]'
    } else {
      return ''
    }
  })

  const finalClass = computed(() => {
    return `${className.value} ${props.work.presentation.classNames['main']}`
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
