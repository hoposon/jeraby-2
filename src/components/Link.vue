<template>
  <router-link
    class="relative inline-block font-medium underline hover:no-underline 
      hover:text-gray-700 after:content-[''] after:bg-[#DF442F] after:absolute after:block after:h-[2px] after:bottom-0 
      after:left-0 after:scale-x-0 after:transition-all after:duration-200 after:ease-in 
      hover:after:scale-x-100 hover:after:w-full"
    :to="link"
  >
    {{
      text
    }}
  </router-link>
</template>

<script setup lang="ts">

  defineProps<{
    text: string,
    link: string
  }>()

</script>