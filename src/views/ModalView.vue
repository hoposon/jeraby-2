<template>
  <component :is="modals[modalName]" />
</template>

<script setup lang="ts">
  import { useModal } from '../composables/modal'

  import ModalWorkContact from '../components/ModalWorkContact.vue'
  import ModalContactError from '../components/ModalContactError.vue'
  import ModalContactSuccess from '../components/ModalContactSuccess.vue'
  import ModalWorkDetailGallery from '../components/ModalWorkDetailGallery.vue'

  const modals: {[key: string]: any} = {
    'WorkContact': ModalWorkContact,
    'ContactError': ModalContactError,
    'ContactSuccess': ModalContactSuccess,
    'WorkDetailGallery': ModalWorkDetailGallery
  }

  const { modalName } = useModal()

</script>