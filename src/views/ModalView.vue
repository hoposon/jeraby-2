<template>
  <Modal>
    <component :is="modals[modalName]" />
  </Modal>
</template>

<script setup lang="ts">
  import { useModal } from '../composables/modal'

  import Modal from '../components/Modal.vue'
  import ModalWorkContact from '../components/ModalWorkContact.vue'

  const modals = {
    'WorkContact': ModalWorkContact
  }

  const { modalName } = useModal()

</script>