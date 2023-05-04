<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full bg-neutral-900/90 fixed top-0 left-0 z-[10001]"
  >
    <div
      class="relative w-[95%] md:w-[75%] overflow-hidden bg-slate-400"
    >
      <button 
        class="absolute top-[15px] right-[15px] z-[10010] bg-close-default hover:bg-close-hover bg-center bg-cover w-8 h-8 transition-all duration-500 ease-in-out"
        @click="closeModal()"
      />
      <div
        class="max-h-[70vh] overflow-y-scroll bg-white"
      >
        <div
          class="flex flex-col items-center justify-center bg-neutral-300/10"
        >
          <slot />
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useModal } from '../composables/modal'

  const { closeModal } = useModal()
</script>