<template>
  <div>
    <PageHeader
      :page="pageHeader"
    />
    <WorksOverviewList :collection-id="collection" />
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import PageHeader from '../components/PageHeader.vue'
  import WorksOverviewList from '../components/WorksOverviewList.vue'
  import { useCollections } from '../composables/collections'

  const { collection } = useRoute().params
  const { getCollection } = useCollections()

  const pageHeader = getCollection(collection)[0].pageHeader
</script>