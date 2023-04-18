<template>
  <button
    class="text-neutral-300 p-2 bg-gray-900 rounded-full hover:bg-gray-700"
    :class="{ 'disabled': disabled }"
    @click="emit('click')"
  >
    {{ translate(text) }}
  </button>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { TranslateKey } from '../localizations/localizations'
  
  interface Props {
    text: string,
    disabled?: boolean
  }
  withDefaults(defineProps<Props>(), {
    disabled: false
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
