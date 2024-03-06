<template>
  <Head>
    <title>Michaela Houf</title>
    <meta
      name="description"
      :content="translate('home.metaDescription')"
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
  import { onMounted } from 'vue'
  import { inject } from 'vue'
  import { Head } from '@unhead/vue/components'

  const translate = inject(TranslateKey, () => '')

  const { setFilterForRoute } = useWorks()
  const pageHeader = PAGES_DATA[HOME].pageHeader

  onMounted(() => {
    setFilterForRoute({newCollection: 'home'})
  })
  
</script>