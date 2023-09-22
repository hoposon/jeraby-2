<template>
  <button
    class="relative inline-block font-medium"
    :class="[hoverClass, addClass]"
    @click="emit('click', {clickValue})"
  >
    {{ translate(text) }}
  </button>
</template>

<script setup lang="ts">
  import { inject, computed } from 'vue'
  import { TranslateKey } from '../localizations/localizations';

  const translate = inject(TranslateKey, () => '')

  interface Props {
    text: string,
    addClass?: string,
    disabled?: boolean,
    clickValue?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    addClass: '',
    disabled: false
  })

  const emit = defineEmits<{
    (e: 'click', { clickValue }: {clickValue?: string} ): void
  }>()

  const hoverClass = computed(() => {
    if (props.disabled) {
      return 'cursor-default'
    } else {
      return "underline hover:no-underline hover:text-gray-700 after:content-[''] after:bg-[#DF442F] after:absolute after:block after:h-[2px] after:bottom-0 after:left-0 after:scale-x-0 after:transition-all after:duration-200 after:ease-in hover:after:scale-x-100 hover:after:w-full"
    }
  })
</script>