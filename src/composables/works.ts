import { ref, computed } from 'vue'
import axios from 'axios'
import { CollectionWorkEnhanced } from '../types'

const configLoading = ref<boolean>(false)
const selectedFilter = ref<string|null>(null)

const works = ref<CollectionWorkEnhanced[]|[]>([])


export function useWorks() {

  const loadWorksConfig = async () => {
    try {
      configLoading.value = true
      works.value = (await axios.get('/configuration/works.json')).data
      works.value = works.value.sort((a:CollectionWorkEnhanced, b: CollectionWorkEnhanced) => a.priority - b.priority)
      works.value = works.value.filter(work => work.published)
    } catch (error) {
      console.log(error)
    } finally {
      configLoading.value = false
    }
  }

  const homePageWorks = computed(() => {
    return works.value.filter(work => work.workAtHomePage)
  })

  const availableWorks = computed(() => {
    return works.value.filter(work => work.workState === 'available')
  })

  const unavailableWorks = computed(() => {
    return works.value.filter(work => work.workState !== 'available')
  })

  const setSelectedFilter = (filter:string|null) => {
    console.log('🚀 ~ file: works.ts:39 ~ setSelectedFilter ~ filter:', filter)
    selectedFilter.value = filter
  }

  const filteredWorks = computed(() => {
    if (selectedFilter.value === null || selectedFilter.value === 'home') {
      return homePageWorks.value
    } else if (selectedFilter.value === 'available') {
      return availableWorks.value
    } else if (selectedFilter.value === 'unavailable') {
      return unavailableWorks.value
    } else {
      return availableWorks.value
    }
  })

  return {
    loadWorksConfig,
    configLoading,
    selectedFilter,
    works,
    filteredWorks,
    homePageWorks,
    availableWorks,
    unavailableWorks,
    setSelectedFilter
  }
}