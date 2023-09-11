<template>
  <component :is="modals[modalName]" />
</template>

<script setup lang="ts">
  import { useModal } from '../composables/modal'

  import ModalWorkContact from '../components/ModalWorkContact.vue'
  import ModalWorkDetailGallery from '../components/ModalWorkDetailGallery.vue'

  const modals: {[key: string]: any} = {
    'WorkContact': ModalWorkContact,
    'WorkDetailGallery': ModalWorkDetailGallery
  }

  const { modalName } = useModal()

</script>