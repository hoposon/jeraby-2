<template>
  <div
    class="flex flex-row w-full pt-10 border border-gray-900"
    :class="[mainClass]"
  >
    <div class="w-full h-[500px] border border-red-600 " />
    <!-- <div
      v-for="(colItems, index) in updatedItems"
      :key="index"
      class="flex flex-col overflow-hidden"
    >
      <div
        v-for="item in colItems"
        :key="item.id"
        class="border-2 border-gray-900 w-full"
      >
        <img
          v-if="item.image"
          :src="item.image.src"
          :alt="item.image.alt"
          class="object-cover w-full v-[100%]"
        >
        <div 
          v-else
          class="p-4"
        >
          <h3 class="text-2xl font-bold">
            {{ item.title }}
          </h3>
          <p class="text-sm">
            {{ item.description?.size }}
          </p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">

  const props = defineProps({
    mainClass: String
  })
</script>