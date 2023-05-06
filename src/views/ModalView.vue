<template>
  <component :is="modals[modalName]" />
</template>

<script setup lang="ts">
  import { useModal } from '../composables/modal'

  import Modal from '../components/Modal.vue'
  import ModalWorkContact from '../components/ModalWorkContact.vue'
  import ModalWorkDetailGallery from '../components/ModalWorkDetailGallery.vue'

  const modals = {
    'WorkContact': ModalWorkContact,
    'WorkDetailGallery': ModalWorkDetailGallery
  }

  const { modalName } = useModal()

</script>