<template>
  <div class="image-gallery">
    <button class="prev-btn" @click="prevSubset">&lt;</button>
    <div class="image-container">
      <transition-group name="fade" tag="div" class="flex gap-2">
        <div :key="index" v-for="(src, index) in currentSubset" class="image">
          <img :src="src" />
        </div>
      </transition-group>
    </div>
    <button class="next-btn" @click="nextSubset">&gt;</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Props {
  images: string[]
  subsetSize: number
  startIndex?: number
}

const props = defineProps<Props>()
// console.log('🚀 ~ file: WorkDetailsGallery.vue:25 ~ props:', props.images)

const currentSubsetIndex = ref(props.startIndex ?? 0)

const currentSubset = computed(() => {
  const step = Math.floor(props.subsetSize / 2)
  console.log('🚀 ~ file: WorkDetailsGallery.vue:31 ~ currentSubset ~ step:', step)
  const start = currentSubsetIndex.value - step
  console.log('🚀 ~ file: WorkDetailsGallery.vue:33 ~ currentSubset ~ start:', start)

  const out = []
  for (let i = start; i < start + props.subsetSize; i++) {
    console.log('🚀 ~ file: WorkDetailsGallery.vue:37 ~ currentSubset ~ i:', i)
    let index = 0
    if (i < 0) index = (props.images.length) + i
    else if (i > (props.images.length - 1)) index = i - (props.images.length)
    else index = i
    console.log('🚀 ~ file: WorkDetailsGallery.vue:42 ~ currentSubset ~ index:', index)
    out.push(props.images[index])
  }

  console.log('🚀 ~ file: WorkDetailsGallery.vue:42 ~ currentSubset ~ out:', out)
  return out

  // let start = 0
  // if (currentSubsetIndex.value - step < 0) {
  //   start = props.images.length - 1
  // } else {
  //   start = currentSubsetIndex.value - step
  // }

  // let end = 0
  // if (currentSubsetIndex.value + step > props.images.length - 1) {
  //   end = 0
  // } else {
  //   end = currentSubsetIndex.value
  // }
  // console.log('🚀 ~ file: WorkDetailsGallery.vue:31 ~ currentSubset ~ props.subsetSize:', props.subsetSize)
  // console.log('🚀 ~ file: WorkDetailsGallery.vue:31 ~ currentSubset ~ start:', start)
  // console.log('🚀 ~ file: WorkDetailsGallery.vue:32 ~ currentSubset ~ props.images.slice(start, start + (props.subsetSize ?? 3)):', props.images.slice(start, start + (props.subsetSize)))

  // const out = []
  // for (let i = 1; i <= props.subsetSize; i++) {

  //   out.push(props.images[])
  // } 
  // return 
})

function prevSubset() {
    if (currentSubsetIndex.value === 0) currentSubsetIndex.value = props.images.length - 1
    else currentSubsetIndex.value--
}

function nextSubset() {
  if (currentSubsetIndex.value === props.images.length - 1) currentSubsetIndex.value = 0
  else currentSubsetIndex.value++
  console.log('🚀 ~ file: WorkDetailsGallery.vue:83 ~ nextSubset ~ currentSubsetIndex.value:', currentSubsetIndex.value)
}
  
</script>

<style scoped>
.image-gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.image-container {
  display: flex;
  overflow: hidden;
  width: 90%;
}

.image {
  /* flex: 1;
  text-align: center; */
  display: flex;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.prev-btn,
.next-btn {
  /* position: absolute;
  top: 50%;
  transform: translateY(-50%); */
  font-size: 2rem;
  font-weight: bold;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
}

.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}
</style>