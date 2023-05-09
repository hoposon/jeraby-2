<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full bg-neutral-900/90 fixed top-0 left-0 z-[10001]"
    :class="classes.topClass"
  >
    <div
      :class="classes.wClass"
    >
      <button 
        class="absolute top-[15px] right-[15px] z-[10010] bg-center bg-cover w-8 h-8 transition-all duration-500 ease-in-out"
        :class="classes.closeBtnClass"
        @click="closeModal()"
      />
      <div
        :class="classes.hClass"
      >
        <slot />
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useModal } from '../composables/modal'

  defineProps<{
    classes: {
      topClass?: string,
      wClass: string,
      hClass: string,
      closeBtnClass: string
    }
  }>()

  const { closeModal } = useModal()
</script>