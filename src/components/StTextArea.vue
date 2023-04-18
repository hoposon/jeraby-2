<template>
  <div
    class="relative"
  >
    <textarea
      :id="id"
      v-model="inputValue"
      :name="id"
      :type="type"
      :aria-label="translate(label)"
      class="peer w-full h-[150px] pl-2 pt-5 border border-gray-900 rounded-md focus:bg-gray-900/10"
      :class="{'filled': isFilled}"
      @input="validate"
      @blur="validate(true)"
    />
    <label 
      :for="id"
      class="absolute top-[8px] left-0 pl-2 transition-all duration-300 ease-in-out text-sm peer-focus:top-1 peer-focus:text-[10px] peer-[.filled]:top-1 peer-[.filled]:text-[10px]"
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
    id: string
    type: string
    label: string
    validationPattern?: string|null
    required?: boolean
    validationMessage?: string
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
  const isValid = ref(true)

  const translate = inject(TranslateKey, () => '')

  const isFilled = computed(() => inputValue.value.length > 0)

  const validate = (setInputValidity?: boolean) => {
    const state = {
      id: props.id,
      value: inputValue.value,
      isValid: false
    }
    if (props.validationPattern) {
      const regex = new RegExp(props.validationPattern)
      state.isValid = regex.test(inputValue.value)
    } else if (props.required && inputValue.value.length === 0) {
      state.isValid = false
    } else {
      state.isValid = true
    }
    if(setInputValidity) {
      isValid.value = state.isValid
    }

    emit('input', state)
  }

  </script>