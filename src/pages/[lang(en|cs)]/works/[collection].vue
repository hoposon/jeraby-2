<template>
  <div>
    <PageHeader
      :page="pageHeader"
    />
    <WorksOverviewList />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useRoute, onBeforeRouteUpdate } from 'vue-router/auto'
  // import PageHeader from '../components/PageHeader.vue'
  // import WorksOverviewList from '../components/WorksOverviewList.vue'
  // import { useWorks } from '../composables/works'
  // import { PAGES_DATA } from '../configuration/pages.config'

  const { selectedFilter, setFilterForRoute } = useWorks()
  const route = useRoute()


  
  const pageHeader = computed(() => {
    return PAGES_DATA[selectedFilter.value?.toLowerCase()||'available'].pageHeader
  })
  
  onBeforeRouteUpdate((to) => {
    setFilterForRoute({newCollection: to.params.collection})
  })

  onMounted(() => {
    setFilterForRoute({newCollection: route.params.collection})
  })
  </script>