<template>
  <div class="w-full flex justify-center items-center h-[500px] overflow-hidden">
    <Gallery
      :images="detailImages"
      :isLink="false"
      :initialSlide="currentDetail"
      :gallery-settings="gallerySettings"
      :galleryStyleSettings="galleryStyleSettings"
    />
  </div>
</template>

<script setup lang="ts">
  import { inject, computed } from 'vue'
  import { useModal } from '../composables/modal'
  // import { TranslateKey } from '../localizations/localizations'
  import Gallery from './Gallery.vue'

  // const translate = inject(TranslateKey, () => '')
  const { modalData } = useModal()
  console.log('🚀 ~ file: ModalWorkDetailGallery.vue:21 ~ modalData:', modalData.value.currentDetail)

  const detailImages = computed(() => {
    console.log('🚀 ~ file: ModalWorkDetailGallery.vue:25 ~ detailImages ~ modalData.value.work.workDetails', modalData.value.work.workDetails.gridItems.filter(item => item.type === 'IMAGE'))
    return modalData.value.work.workDetails.gridItems.filter(item => item.type === 'IMAGE')
  })

  const currentDetail = computed(() => {
    console.log('🚀 ~ file: ModalWorkDetailGallery.vue:30 ~ currentDetail ~ detailImages.value.findIndex(detail => detail.id === modalData.value.currentDetail):', detailImages.value.findIndex(detail => detail.id === modalData.value.currentDetail))
    console.log('🚀 ~ file: ModalWorkDetailGallery.vue:30 ~ currentDetail ~ detailImages.value.findIndex(detail => detail.id === modalData.value.currentDetail):', typeof detailImages.value.findIndex(detail => detail.id === modalData.value.currentDetail))
    return detailImages.value.findIndex(detail => detail.id === modalData.value.currentDetail)
  })

  const gallerySettings = {
    itemsToShow: 1,
      snapAlign: 'center',
      wrapAround: true,
  }

  const galleryStyleSettings = {
    carouselItem: 'h-[200px] min-[550px]:h-[250px] lg:h-[300px] shadow-xl'
  }
  

</script>