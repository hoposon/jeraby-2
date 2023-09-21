<template>
  <button
    v-if="!processing"
    class="text-neutral-300 font-medium p-2 bg-gray-900 rounded-full hover:bg-gray-700 text-lg"
    :class="{ 'disabled': disabled }"
    @click="emit('click')"
  >
    {{ translate(text) }}
  </button>
  <button
    v-else
    class="flex items-center justify-center text-neutral-300 font-medium p-2 bg-gray-900 rounded-full hover:bg-gray-700 text-lg"
    :class="{ 'disabled': true }"
  >
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>{{ translate('cta.button.processing') }}</span>
  </button>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { TranslateKey } from '../localizations/localizations'
  
  interface Props {
    text: string,
    disabled?: boolean,
    processing?: boolean
  }
  withDefaults(defineProps<Props>(), {
    disabled: false,
    processing: false
  })

  const emit = defineEmits(['click'])
  
  const translate = inject(TranslateKey, () => '')

</script>

<style>
  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
