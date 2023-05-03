<template>
  <PageHeader
    :page="pageHeader"
  />
  <div
    class="max-w-[2000px] mx-auto"
  >
    About page
  </div>
</template>

<script setup lang="ts">
  import PageHeader from '../components/PageHeader.vue'
  import { PAGES_DATA, ABOUT } from '../configuration/pages.config'

  const pageHeader = PAGES_DATA[ABOUT].pageHeader

</script>