<template>
  <div>
    <PageHeader
      :page="pageHeader"
    />
    <WorksOverviewList />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  
  // import PageHeader from '../components/PageHeader.vue'
  // import WorksOverviewList from '../components/WorksOverviewList.vue'
  // import { useWorks } from '../composables/works'
  // import { PAGES_DATA } from '../configuration/pages.config'

  const { selectedFilter } = useWorks()

  const pageHeader = computed(() => {
    return PAGES_DATA[selectedFilter.value?.toLowerCase()||'available'].pageHeader
  })
  </script>