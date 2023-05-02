<template>
  <div class="w-full flex">
    <!-- <button class="block w-[5%] h-[350px]" @click="scrollLeft">Left</button> -->
    <div ref="scroller" class="overflow-x-auto w-full overflow-y-hidden">
      <div ref="galleryWrapper" id="galleryWrapper" class="gallery flex gap-[3.3%]">
        <div class="gallery__item min-w-[30%] h-[350px]" v-for="(image, index) in scrollThrough" :key="index">
          <img :src="image" alt="image" class="w-full h-[100%] object-cover" />
        </div>
      </div>
    </div>
    <!-- <button class="block w-[5%] h-[150px]" @click="scrollRight">Left</button> -->
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'

  interface Props {
    images: string[]
    subsetSize: number
    startIndex?: number
  }

  const props = defineProps<Props>()

  const scroller = ref(null)

  

  const currentSubsetIndex = ref(props.startIndex ?? 0)

  const scrollThrough = ref([...props.images, ...props.images, ...props.images])
  console.log('🚀 ~ file: DetailsScrollGallery.vue:33 ~ scrollThrough:', scrollThrough.value.length)

  const galleryWrapper = ref(null)
  // const scrollWidth = computed(() => {
  //   if (!galleryWrapper.value) return 0
  //   else return galleryWrapper.value.scrollWidth
  // })

  const scrollLeft = () => {
    const gallery = document.querySelector('.gallery')
    gallery.scrollLeft -= 150
  }

  const scrollRight = () => {
    const gallery = document.querySelector('.gallery')
    gallery.scrollLeft += 150
  }

  onMounted(() => {
    if (scroller.value) {
      const scrollWidth = !galleryWrapper.value ? 0 : galleryWrapper.value.scrollWidth - galleryWrapper.value.clientWidth

      scroller.value.scrollLeft = scrollWidth / 3

      scroller.value.addEventListener('scroll', () => {
        console.log('🚀 ~ file: DetailsScrollGallery.vue:56 ~ scroller.value.addEventListener ~ scrollWidth:', scrollWidth)
        console.log('🚀 ~ file: DetailsScrollGallery.vue:56 ~ scroller.value.addEventListener ~ scroller.value.scrollLeft:', scroller.value.scrollLeft)
        if (scroller.value.scrollLeft > scrollWidth - 100) {
          console.log('🚀 ~ file: DetailsScrollGallery.vue:61 ~ scroller.value.addEventListener ~ scroller.value.scrollLeft:', scroller.value.scrollLeft)
          
          let tempArr = scrollThrough.value.slice(props.images.length)
          tempArr = [...tempArr, ...props.images]
          scrollThrough.value = tempArr
        } else if (scroller.value.scrollLeft < 100) {
          console.log('🚀 ~ file: DetailsScrollGallery.vue:67 ~ scroller.value.addEventListener ~ scroller.value.scrollLeft:', scroller.value.scrollLeft)
          let tempArr = scrollThrough.value.slice(-props.images.length)
          tempArr = [...props.images, ...tempArr]
          scrollThrough.value = tempArr
        }
      })
    }
  })

  </script>

