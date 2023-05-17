<template>
  <component :is="modals[modalName]" />
</template>

<script setup lang="ts">
  import { useModal } from '../composables/modal'

  import ModalWorkContact from '../components/ModalWorkContact.vue'
  import ModalWorkDetailGallery from '../components/ModalWorkDetailGallery.vue'
import { Component } from 'vue'

  const modals: {[key: string]: Component} = {
    'WorkContact': ModalWorkContact,
    'WorkDetailGallery': ModalWorkDetailGallery
  }

  const { modalName } = useModal()

</script>