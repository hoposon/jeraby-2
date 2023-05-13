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
  // import { useRoute } from 'vue-router'
  import PageHeader from '../components/PageHeader.vue'
  import WorksOverviewList from '../components/WorksOverviewList.vue'
  import { useWorks } from '../composables/works'
  import { PAGES_DATA } from '../configuration/pages.config'

  // const { collection } = useRoute().params
  const { selectedFilter } = useWorks()

  // if (collection !== selectedFilter.value) selectedFilter.value = collection


  const pageHeader = computed(() => {
    return PAGES_DATA[selectedFilter.value?.toLowerCase()].pageHeader
  })

</script>