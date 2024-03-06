<template>
  <Head>
    <title>{{ translate(`${selectedFilter?.toLowerCase()}.works.metaTitle`) }}</title>
    <meta 
      name="description" 
      :content="translate(`${selectedFilter?.toLowerCase()}.works.metaDescription`)"
    />
  </Head>
  <div>
    <PageHeader
      :page="pageHeader"
    />
    <WorksOverviewList />
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, onMounted } from 'vue'
  import { useRoute, onBeforeRouteUpdate } from 'vue-router/auto'
  import { Head } from '@unhead/vue/components'

  const { selectedFilter, setFilterForRoute } = useWorks()
  const route = useRoute()

  const translate = inject(TranslateKey, () => '')
  
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