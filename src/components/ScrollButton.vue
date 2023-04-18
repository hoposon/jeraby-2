<template>
  <button 
    class="flex items-center transition-all duration-300 ease-in-out hover:scale-[1.2]"
    @click="scrollToTop"
  >
    <!-- <span class="inline-block mr-2 align-middle transform -translate-y-[1px]"> -->
    <span>
      <span class="inline-block w-[22px] h-[22px] border-r-[3px] border-b-[3px] border-neutral-300 transform rotate-[-135deg] translate-y-[5px]" />
      <span class="inline-block w-[24px] h-1 border-b-[3px] border-neutral-300 transform -rotate-90 -translate-x-[24px] -translate-y-[3px]" />
    </span>
  </button>
</template>

<script setup lang="ts">

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

</script>
