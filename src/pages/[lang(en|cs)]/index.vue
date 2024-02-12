<template>
  <div>
    <PageHeader
      :page="pageHeader"
    />
    <WorksOverviewList />
  </div>
</template>

<script setup lang="ts">
  // import PageHeader from '../components/PageHeader.vue'
  // import WorksOverviewList from '../components/WorksOverviewList.vue'

  // import { PAGES_DATA, HOME } from '../configuration/pages.config'

  

  const pageHeader = PAGES_DATA[HOME].pageHeader
  
</script>