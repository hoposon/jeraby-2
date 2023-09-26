<template>
  <Modal
    :classes="modalClasses"
  >
    <!-- <div class="flex justify-center items-center overflow-x-hidden"> -->
      <!-- <Gallery
        :images="testData"
        :isLink="false"
        :initialSlide="currentDetail"
        :gallery-settings="gallerySettings"
        :galleryStyleSettings="galleryStyleSettings"
      /> -->
      <Gallery
        :images="detailImages"
        :isLink="false"
        :initialSlide="currentDetail"
        :gallery-settings="gallerySettings"
      />
    <!-- </div> -->
  </Modal>
</template>

<script setup lang="ts">
  import { inject, computed } from 'vue'
  import { useModal } from '../composables/modal'
  import Modal from './Modal.vue'
  import Gallery from './Gallery.vue'

  const { modalData } = useModal()

  const modalClasses = {
    topClass: "detail-modal",
    wClass: "relative w-[95%] overflow-hidden bg-transparent",
    hClass: "h-[95vh] w-[100%] overflow-hidden bg-transparent",
    closeBtnClass: "bg-close-trans-red hover:bg-close-trans-white"
  }

  const gallerySettings = {
    itemsToShow: 1,
      snapAlign: 'center',
      wrapAround: true,
  }

  const detailImages = computed(() => {
    return modalData.value.work.workDetails.gridItems.filter(item => item.type === 'IMAGE')
  })

  const currentDetail = computed(() => {
    return detailImages.value.findIndex(detail => detail.id === modalData.value.currentDetail)
  })

  const testData = [{
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/1.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/1.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/2.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/2.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/5.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/5.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/6.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/6.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/7.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/7.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/8.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/8.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/9.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/9.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/10.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/10.imgAlt',
          },
        }, {
          
          image: {
            imgPath: '/images/collections/jeraby/jeraby-1/11.jpg',
            imgAlt: 'jeraby.collection.works.jeraby-1.workDetails.jeraby-1/11.imgAlt',
          },
        }]
  

</script>

<style>
  /* .carousel__item {
    width: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  } */

  .detail-modal
    .carousel__slide {
      padding: 10 !important;
    }

  .detail-modal
    .carousel__item {
      height: 100%
    }
</style>