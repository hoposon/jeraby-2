<template>
  <Modal
    :classes="modalClasses"
  >
    <div
      class="flex flex-col items-center justify-center bg-neutral-300/10 p-4 md:p-10"
    >
      <div class="bg-center bg-cover w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] bg-home-icon-red" />
      <div class="border-[1px] border-gray-900 w-[43vw] mb-10"/>
      <div 
        class="text-3xl sm:text-5xl font-medium text-center mb-6"
      >
        {{ translate('modal.contact.message.thank.you') }}
      </div>
      <div
        class="text-2xl text-center mb-10"
      >
        {{ translate('modal.contact.message.sent.success') }}
      </div>
      
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { TranslateKey } from '../localizations/localizations'
  import Modal from './Modal.vue'

  const translate = inject(TranslateKey, () => '')
  
  const modalClasses = {
    wClass: "relative w-[95vw] md:w-[65vw] overflow-hidden bg-slate-400",
    hClass: "max-h-[70vh] overflow-y-scroll bg-white",
    closeBtnClass: "bg-close-default hover:bg-close-hover"
  }

</script>