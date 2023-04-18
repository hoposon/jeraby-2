<template>
  <div
    v-if="!configLoading"
    class="overflow-x-hidden"
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
  import { useCollections } from './composables/collections'
  import { useModal } from './composables/modal'

  import Navigation from './components/Navigation.vue'
  import NavScrollWatcher from './components/NavScrollWatcher.vue'
  import ModalView from './views/ModalView.vue'
  

  useScroll()

  const { loadCollectionsConfig, configLoading } = useCollections()
  const { modalName } = useModal()

  onBeforeMount(() => {
    loadCollectionsConfig()
  })
  

</script>

<style scoped>

</style>
