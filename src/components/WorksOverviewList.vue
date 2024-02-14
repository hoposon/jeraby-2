<template>
  <div
    class="content"
  >
    <div
      v-for="work, index in filteredWorks"
      :key="work.id"
      class="max-w-[2000px]"
      :class="{'mx-auto': work.presentation.presentationType !== 'twoImages'}"
    >
      <WorkOverview
        :work="work"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useWorks } from '../composables/works'
  import WorkOverview from './WorkOverview.vue'

  const { filteredWorks } = useWorks()

</script>