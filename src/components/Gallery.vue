<template>
  <Carousel 
    v-bind="gallerySettings" 
    :modelValue="initialSlide"
    class="max-w-[100%]"
  >
    <Slide v-for="image in images" :key="image.id">
      <div 
        class="carousel__item"
      >
        <router-link 
          v-if="isLink"
          :to="image.link"
          class="w-full"
          :class="galleryStyleSettings?.carouselItem"
        >
          <img 
            :src="image.image.imgPath" 
            :alt="image.image.imgAlt"
            class="w-full h-[100%] object-cover" />
        </router-link>
        <div
          v-else
          class="w-[50%]"
          :class="galleryStyleSettings?.carouselItem"
        >
          <img 
            :src="image.image.imgPath" 
            :alt="image.image.imgAlt"
            class="w-full h-[100%] object-cover" />
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination
        v-if="pagination"
      />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

  interface Props {
    images: {
      id: string,
      type?: 'TEXT'|'IMAGE'
      image: {
        imgPath: string,
        imgAlt: string,
      },
      link?: string
    }[]
    initialSlide?: number 
    pagination?: boolean
    isLink?: boolean
    gallerySettings: {
      itemsToShow: number,
      snapAlign: 'start' | 'center' | 'end',
      wrapAround: boolean,
      autoplay?: number,
      transition?: number,
      breakpoints: {
        [key: number]: {
          itemsToShow: number,
          snapAlign: 'start' | 'center' | 'end',
        }
      }
    }
    galleryStyleSettings?: {
      carouselItem?: string
    }
  }

  const props = withDefaults(defineProps<Props>(), {
    initialSlide: 0,
    pagination: false,
    isLink: true,
    gallerySettings: {
      itemsToShow: 1,
      snapAlign: 'center',
      wrapAround: true,
      breakpoints: {
        640: {
          itemsToShow: 2,
          snapAlign: 'center',
        },
        768: {
          itemsToShow: 3,
          snapAlign: 'center',
        },
        1024: {
          itemsToShow: 4,
          snapAlign: 'center',
        },
      },
    },
  })

</script>

<style>
  .carousel__item {
    width: 100%;
    /* background-color: green; */
    /* color: white; */
    /* font-size: 20px; */
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel__slide {
    padding: 10px;
    @media (min-width: 768px) {
      padding: 20px;
    }
    
  }

  .carousel__viewport {
    /* perspective: 2000px; */
    width: 100%;
  }

  .carousel__track {
    /* transform-style: preserve-3d; */
  }

  .carousel__slide--sliding {
    transition: 0.5s;
  }

  .carousel__slide {
    opacity: 0.9;
    /* transform: rotateY(-10deg) scale(0.95); */
  }

  .carousel__slide--active ~ .carousel__slide {
    /* transform: rotateY(10deg) scale(0.95); */
  }

  .carousel__slide--prev {
    opacity: 1;
    /* transform: rotateY(-10deg) scale(0.95); */
  }

  .carousel__slide--next {
    opacity: 1;
    /* transform: rotateY(10deg) scale(0.95); */
  }

  .carousel__slide--active {
    opacity: 1;
    /* transform: rotateY(0) scale(1.1); */
  }

  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    background-color: rgb(212 212 212);
    box-shadow: 4px 7px 13px 1px rgb(17 24 39);
    color: rgb(95, 82, 82);
  }

  .carousel__prev:hover,
  .carousel__next:hover {
    background-color: white;
    color: rgb(17 24 39);
  }

  /* .carousel__prev {
    left: -8%;
  }

  .carousel__next {
    right: -8%;
  } */
</style>