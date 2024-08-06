<template>
  <div
    class="relative"
  >
    <input
      :id="id"
      v-model="inputValue"
      :name="id"
      :type="type"
      :aria-label="translate(label)"
      class="peer w-full h-[50px] pl-2 pt-3 border border-gray-900 rounded-md focus:bg-gray-900/10"
      :class="{'filled': isFilled}"
      @input="validate()"
      @blur="validate(true)"
    >
    <label 
      :for="id"
      class="absolute top-[14px] left-0 pl-2 transition-all duration-300 ease-in-out text-base peer-focus:top-1 peer-focus:text-[12px] peer-[.filled]:top-1 peer-[.filled]:text-[12px] pointer-events-none"
    >
      {{ translate(label) }}
    </label>
    <div
      v-if="!isValid"
      class="text-[#DF442F] text-xs"
    >
      {{ translate(validationMessage) }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, ref, computed } from 'vue'
  import { TranslateKey } from '../localizations/localizations'

  interface Props {
    id: string;
    type: string;
    label: string;
    validationPattern?: null | (() => RegExp);
    required?: boolean;
    validationMessage?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    validationPattern: null,
    required: false,
    validationMessage: ''
  })

  const emit = defineEmits<{
    (e: 'input', { id, value, isValid }: {id: string, value: string, isValid: boolean} ): void
  }>()

  const inputValue = ref('')
  const isFilled = computed(() => inputValue.value.length > 0)
  const isValid = ref(true)

  const translate = inject(TranslateKey, () => '')


  let regex: null|RegExp = null;
  if (typeof props.validationPattern === 'function') {
    regex = props.validationPattern()
  }
  const validate = (setInputValidity=false) => {
    const state = {
      id: props.id,
      value: inputValue.value,
      isValid: false
    }
    
    if (regex) {
      state.isValid = regex.test(inputValue.value)
    } else if (props.required && inputValue.value.length === 0) {
      state.isValid = false
    } else {
      state.isValid = true
    }

    if (setInputValidity) {
      isValid.value = state.isValid
    }
    emit('input', state)
  }

  </script>