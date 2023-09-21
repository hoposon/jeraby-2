<template>
  <Modal
    :classes="modalClasses"
  >
    <div
      class="flex flex-col items-center justify-center bg-neutral-300/10"
    >
      <div>{{ translate('Error') }}</div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { TranslateKey } from '../localizations/localizations'
  import Modal from './Modal.vue'

  const translate = inject(TranslateKey, () => '')
  
  const modalClasses = {
    wClass: "relative w-[95%] md:w-[75%] overflow-hidden bg-slate-400",
    hClass: "max-h-[70vh] overflow-y-scroll bg-white",
    closeBtnClass: "bg-close-default hover:bg-close-hover"
  }

</script>