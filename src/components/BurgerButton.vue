<template>
  <div
    class="menu transition-all duration-300 ease-in-out hover:scale-[1.2]"
    @click="openNav"
  >
    <div
      class="bar"
      :class="[heightClass,color]"
    />
    <div
      class="bar"
      :class="[heightClass,color]"
    />
    <div
      class="bar"
      :class="[heightClass,color]"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useNavigation } from '../composables/navigation'

  const {
    openNav } = useNavigation()

  interface Props {
    barHeight?: string,
    color?: string|string[]
  }

  const props = withDefaults(defineProps<Props>(), {
    barHeight: 'xl',
    color: 'bg-white'
  })

  const heightClass = computed(() => {
    switch(props.barHeight) {
      case 'sm':
        return 'mb-[4px]'
      case 'md':
        return 'mb-[6px]'
      case 'lg':
        return 'mb-[8px]'
      case 'xl':
        return 'mb-[8px]'
      default:
        return 'mb-[10px]'
    }
  })
  

</script>

<style>
  .menu {
    display: inline-block;
    cursor: pointer;
  }

  .menu .bar:last-child {
    margin-bottom: 0;
}

  .bar {
    width: 80%;
    height: 3px;
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
  }
</style>