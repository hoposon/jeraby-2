<template>
  <form
    class="w-full flex flex-col items-center justify-center"
    @submit.prevent="validateAndRecaptcha"
  >
    <div
      class="w-[80%] gap-[2%] flex flex-col xl:flex-row"
    >
      <StInput
        id="id-name"
        type="text"
        :label="translate('modal.work.contact.name')"
        :validation-pattern="() => new RegExp(/^.+$/)"
        :validation-message="'modal.work.contact.validation.name'"
        class="w-full xl:w-[49%] mb-3"
        @input="handleInput"
      />
      <StInput
        id="id-surname"
        type="text"
        :label="translate('modal.work.contact.surname')"
        :validation-pattern="() => new RegExp(/^.+$/)"
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
        :validation-pattern="() => new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)"
        :validation-message="'modal.work.contact.validation.email'"
        class="w-full xl:w-[49%] mb-3"
        @input="handleInput"
      />
      <StInput
        id="id-phone"
        type="phone"
        :label="translate('modal.work.contact.phone')"
        :validation-pattern="() => new RegExp(/^[0-9]+$/)"
        :validation-message="'modal.work.contact.validation.phone'"
        class="w-full xl:w-[49%] mb-3"
        @input="handleInput"
      />
    </div>
    <StTextArea
      id="id-message"
      type="text"
      :label="translate('modal.work.contact.message')"
      :validation-pattern="() => new RegExp(/^[\s\S]*\S[\s\S]*$/)"
      :validation-message="'modal.work.contact.validation.message'"
      class="w-[80%] mb-7"
      @input="handleInput"
    />
    <CtaButton
      text="modal.work.contact.submit"
      class="w-[80%] sm:w-[60%]"
      :disabled="!isValid"
      :processing="processing"
    />
    <div 
      class="g-recaptcha"
      :data-sitekey=recaptchaSiteKey
      data-callback="sendCaptchaFn"
      data-size="invisible">
    </div>
  </form>
</template>

<script setup lang="ts">
  import { computed, inject, onBeforeMount, onMounted, ref} from 'vue'
  import { TranslateKey, useLocalizations } from '../localizations/localizations'
  import { useRecaptcha } from '../composables/recaptcha'
  import type { EmailData } from '../composables/contact'
  import { useContact } from '../composables/contact'
  import { allowedModalNames, useModal } from '../composables/modal'
  import StInput from './StInput.vue'
  import StTextArea from './StTextArea.vue'
  import CtaButton from './CtaButton.vue'

  const translate = inject(TranslateKey, () => '')
  const { locale } = useLocalizations()
  const { loadReCaptcha, recaptchaSiteKey, recaptcha } = useRecaptcha() 
  const { sendContact } = useContact()
  const { openModal } = useModal()
  const processing = ref<boolean>(false)

  interface Props {
    contactSubject: string,
    workStatus?: 'unavailable'|'available'
  }

  const props = defineProps<Props>()

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

  const emailData = ref<EmailData>({
    'work-status': props.workStatus,
    'subject': props.contactSubject
  })

  const isValid = computed(() => {
    return Object.values(inputStates.value).every((input) => input.isValid)
    
  })

  const mapInputStatesToEmailData = () => {
    const emailData: EmailData = {}
    Object.keys(inputStates.value).forEach(key => emailData[key] = inputStates.value[key].value)
    return emailData
  }

  const submitForm = async (token: string) => {
    if (isValid.value) {
      try {
        sendContact(
          token,
          {
            ...mapInputStatesToEmailData(),
            ...emailData.value
          }
        )
        openModal(allowedModalNames.ContactSuccess)
      } catch (e) {
        openModal(allowedModalNames.ContactError)
      }      
    }
  }

  onBeforeMount(() => {
    // set recaptcha callback functions
    window.sendCaptchaFn = submitForm;
    // window.loginCaptchaExpFn = this.captchaExpired;
    // window.loginCaptchaErrFn = this.captchaErr;
  })
  onMounted(() => {
    loadReCaptcha(locale.value)
  })

  const validateAndRecaptcha = () => {
    if (isValid.value) {
      try {
        processing.value = true
        recaptcha()
      } catch (e) {
        openModal(allowedModalNames.ContactError)
      }
    }    
  }

  const handleInput = (e: {id: string, value: string, isValid: boolean}) => {
    inputStates.value[e.id] = {
      value: e.value,
      isValid: e.isValid
    }
  }
  

</script>