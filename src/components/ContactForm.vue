<template>
  <form
    class="w-full flex flex-col items-center justify-center"
    @submit.prevent="submitForm"
  >
    <div
      class="w-[80%] gap-[2%] flex flex-col xl:flex-row"
    >
      <StInput
        id="id-name"
        type="text"
        :label="translate('modal.work.contact.name')"
        :validation-pattern="'[a-zA-Z]+'"
        :validation-message="'modal.work.contact.validation.name'"
        class="w-full xl:w-[49%] mb-3"
        @input="handleInput"
      />
      <StInput
        id="id-surname"
        type="text"
        :label="translate('modal.work.contact.surname')"
        :validation-pattern="'[a-zA-Z]+'"
        :validation-message="'modal.work.contact.validation.surname'"
        class="w-full xl:w-[49%] mb-3"
        @input="handleInput"
      />
    </div>
    <div
      class="w-[80%] gap-[2%] flex flex-col xl:flex-row"
    >
      <StInput
        id="id-email"
        type="email"
        :label="translate('modal.work.contact.email')"
        :validation-pattern="'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'"
        :validation-message="'modal.work.contact.validation.email'"
        class="w-full xl:w-[49%] mb-3"
        @input="handleInput"
      />
      <StInput
        id="id-phone"
        type="phone"
        :label="translate('modal.work.contact.phone')"
        :validation-pattern="'[0-9]+'"
        :validation-message="'modal.work.contact.validation.phone'"
        class="w-full xl:w-[49%] mb-3"
        @input="handleInput"
      />
    </div>
    <StTextArea
      id="id-message"
      type="text"
      :label="translate('modal.work.contact.message')"
      :validation-pattern="'[a-zA-Z0-9]+'"
      :validation-message="'modal.work.contact.validation.message'"
      class="w-[80%] mb-7"
      @input="handleInput"
    />
    <CtaButton
      text="modal.work.contact.submit"
      class="w-[80%] sm:w-[60%]"
      :disabled="!isValid"
    />
  </form>
</template>

<script setup lang="ts">
  import { inject, ref, computed } from 'vue'
  import { TranslateKey } from '../localizations/localizations'
  import StInput from './StInput.vue'
  import StTextArea from './StTextArea.vue'
  import CtaButton from './CtaButton.vue'

  const translate = inject(TranslateKey, () => '')

  const submitForm = () => {
    console.log('submit')
  }

  interface InputStates {
    [key: string]: {
      value: string,
      isValid: boolean
    }
  }

  const inputStates = ref<InputStates>({
    'id-name': { value: '', isValid: false },
    'id-surname': { value: '', isValid: false },
    'id-email': { value: '', isValid: false },
    'id-phone': { value: '', isValid: false },
    'id-message': { value: '', isValid: false }
  })

  const isValid = computed(() => {
    return Object.values(inputStates.value).every((input) => input.isValid)
    
  })

  const handleInput = (e: {id: string, value: string, isValid: boolean}) => {
    inputStates.value[e.id] = {
      value: e.value,
      isValid: e.isValid
    }
  }
  

</script>