<template>
  <Carousel v-bind="gallerySettings">
    <Slide v-for="image in images" :key="image.id">
      <div 
        class="carousel__item"
        :class="galleryStyleSettings?.carouselItem"
      >
        <router-link :to="image.link">
          <img 
            :src="image.image.imgPath" 
            :alt="image.image.imgAlt"
            class="w-full h-[100%] object-cover" />
        </router-link>
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
      image: {
        imgPath: string,
        imgAlt: string,
      },
      link: string
    }[]
    pagination?: boolean
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
    pagination: false,
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
  }

  /* .carousel__prev {
    left: -8%;
  }

  .carousel__next {
    right: -8%;
  } */
</style>