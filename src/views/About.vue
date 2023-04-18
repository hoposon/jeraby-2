<template>
  <PageHeader
    :page="pageHeader"
  />
</template>

<script setup lang="ts">
  import PageHeader from '../components/PageHeader.vue'
  import { PAGES_DATA, ABOUT } from '../configuration/pages.config'

  const pageHeader = PAGES_DATA[ABOUT].pageHeader

</script>