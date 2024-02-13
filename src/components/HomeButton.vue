<template>
  <router-link
      :to="`/${locale}`"
      class="absolute top-10 left-[10vw] bg-center bg-cover bg-home-icon w-10 h-10 transition-all duration-200 ease-in-out hover:scale-[1.2]"
      :class="addClass"
      @click="closeNav"
    >
    </router-link> 
</template>

<script setup lang="ts">

  import { useNavigation } from '../composables/navigation';
  import { useLocalizations } from '~/localizations/localizations';

  defineProps<{
    addClass?: string
  }>()

  const { closeNav } = useNavigation()
  const { locale } = useLocalizations()
</script>