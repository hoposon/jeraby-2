<template>
  <Modal
    :classes="modalClasses"
  >
    <div
      class="flex flex-col items-center justify-center bg-neutral-300/10"
    >
      <div
        class="flex flex-row"
      >
        <div
          class="w-[20%] sm:w-[40%]"
        >
          <img
            class="object-cover w-[100%] h-[100%]"
            :src="modalData.work.presentation.presentationImages[1].imgPath"
            :alt="modalData.work.presentation.presentationImages[1].imgAlt"
          >
        </div>
        
        <div
          class="flex flex-col items-center justify-center w-[80%] sm:w-[60%] py-10"
        >
          <h3 class="text-4xl font-normal mb-5 text-center text-[#DF442F]">
            {{ translate(modalData.work.title) }}
          </h3>
        
          <p
            class="w-[80%] text-sm text-center mb-4"
          >
            {{ translate(`modal.work.contact.${modalData.work.workState}.description`) }}
          </p>
          <ContactForm
            :contact-subject="`Jeraby, detail: ${modalData.work.id}`"
            :work-status="modalData.work.workState"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { useModal } from '../composables/modal'
  import { TranslateKey } from '../localizations/localizations'
  import Modal from './Modal.vue'
  import ContactForm from './ContactForm.vue'

  const translate = inject(TranslateKey, () => '')
  const { modalData } = useModal()
  
  const modalClasses = {
    wClass: "relative w-[95%] md:w-[75%] overflow-hidden bg-slate-400",
    hClass: "max-h-[70vh] overflow-y-scroll bg-white",
    closeBtnClass: "bg-close-default hover:bg-close-hover"
  }

</script>