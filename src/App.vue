<template>
  <div
    v-if="!configLoading && !localeLoading"
    class="main overflow-x-hidden"
  >
    <Navigation />
    <NavScrollWatcher />
    <RouterView />
    <ModalView
      v-if="modalName!==''"
    />
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import { useScroll } from './composables/scroll'
  import { useWorksConfig } from './composables/works'
  import { useModal } from './composables/modal'
  import { useLocalizations } from './localizations/localizations'
  import Navigation from './components/Navigation.vue'
  import NavScrollWatcher from './components/NavScrollWatcher.vue'
  import ModalView from './components/ModalView.vue'  

  useScroll()

  const { loadWorksConfig, configLoading } = useWorksConfig()
  const { modalName } = useModal()
  const { localeLoading } = useLocalizations()

  onBeforeMount(() => {
    loadWorksConfig()
  })
  

</script>