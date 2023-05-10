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
  import { onBeforeMount, watch } from 'vue'
  import { useScroll } from './composables/scroll'
  import { useWorks } from './composables/works'
  import { useModal } from './composables/modal'
  import { useRoute } from 'vue-router'

  import Navigation from './components/Navigation.vue'
  import NavScrollWatcher from './components/NavScrollWatcher.vue'
  import ModalView from './views/ModalView.vue'
  

  useScroll()

  const { loadWorksConfig, configLoading, setSelectedFilter } = useWorks()
  const { modalName } = useModal()
  const route = useRoute()

  watch(
    () => route.params, 
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (newParams) => {
      if(newParams.collection) {
        setSelectedFilter(newParams.collection)
      } else {
        setSelectedFilter(null)
      }
    }
  )

  onBeforeMount(() => {
    loadWorksConfig()
  })
  

</script>

<style scoped>

</style>
