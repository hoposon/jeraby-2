<template>
  <div
    class="demo-content"
  >
    <div
      v-for="work, index in works"
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
  import { computed } from 'vue'
  import WorkOverview from './WorkOverview.vue'

  import { useWorks } from '../composables/works'

  const { homePageWorks, availableWorks, unavailableWorks, selectedFilter } = useWorks()

  const works = computed(() => {
    if (selectedFilter.value === null || selectedFilter.value === 'home') {
      return homePageWorks.value
    } else if (selectedFilter.value === 'available') {
      return availableWorks.value
    } else if (selectedFilter.value === 'unavailable') {
      return unavailableWorks.value
    } else {
      return availableWorks.value
    }
  })
  // console.log('🚀 ~ file: WorksOverviewList.vue:38 ~ works ~ works:', works)

</script>