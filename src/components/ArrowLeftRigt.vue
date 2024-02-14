<template>
  <span :class="{'-translate-y-[3px]': left, '-translate-y-[6px]': right}">
    <span 
      class="inline-block w-[15px] h-[15px] border-r-[2px] border-b-[2px] border-neutral-300 transform" 
      :class="[leftArrow, rightArrow]"
    />
    <span 
      class="inline-block w-[20px] h-1 border-b-[2px] border-neutral-300 transform"
      :class="[leftLeg, rightLeg]"
    />
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    left?: boolean,
    right?: boolean
  }>()

  const leftArrow = computed(() => {
    if (props.left) {
      return 'rotate-[135deg] translate-y-[5px]'
    }
    return ''
  })

  const rightArrow = computed(() => {
    if (props.right) {
      return 'rotate-[-45deg] translate-y-[5px]'
    }
    return ''
  })

  const leftLeg = computed(() => {
    if (props.left) {
      return '-translate-x-[16px] -translate-y-[2px]'
    }
    return ''
  })

  const rightLeg = computed(() => {
    if (props.right) {
      return '-translate-x-[20px] -translate-y-[2px]'
    }
    return ''
  })
</script>