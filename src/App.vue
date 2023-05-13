<template>
  <div
    v-if="!configLoading"
    class="main overflow-x-hidden"
  >
    <Navigation />
    <NavScrollWatcher />
    <router-view />
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

  import Navigation from './components/Navigation.vue'
  import NavScrollWatcher from './components/NavScrollWatcher.vue'
  import ModalView from './views/ModalView.vue'
  

  useScroll()

  const { loadWorksConfig, configLoading } = useWorks()
  const { modalName } = useModal()

  onBeforeMount(() => {
    loadWorksConfig()
  })
  

</script>

<style scoped>

</style>
