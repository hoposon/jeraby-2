<template>
  <PageHeader
    :page="pageHeader"
  />
  <div
    class="max-w-[2000px] mx-auto"
  >
    <ContactForm />
  </div>
</template>

<script setup lang="ts">
  import PageHeader from '../components/PageHeader.vue'
  import { PAGES_DATA, CONTACT } from '../configuration/pages.config'
  import ContactForm from '../components/ContactForm.vue'

  const pageHeader = PAGES_DATA[CONTACT].pageHeader

</script>