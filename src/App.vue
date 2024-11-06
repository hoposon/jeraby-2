<template>
  <div
    v-if="!configLoading && !localeLoading"
    class="main overflow-x-hidden"
  >
    <Navigation />
    <NavScrollWatcher />
    <router-view :key="$route.fullPath"/>
    <ModalView
      v-if="modalName!==''"
    />
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import { useScroll } from './composables/scroll'
  import { useWorks } from './composables/works'
  import { useModal } from './composables/modal'
  import { useLocalizations } from './localizations/localizations'

  import Navigation from './components/Navigation.vue'
  import NavScrollWatcher from './components/NavScrollWatcher.vue'
  import ModalView from './views/ModalView.vue'
  

  useScroll()

  const { loadWorksConfig, configLoading } = useWorks()
  const { modalName } = useModal()
  const { localeLoading } = useLocalizations()

  onBeforeMount(() => {
    loadWorksConfig()
  })
  

</script>

<style scoped>

</style>
