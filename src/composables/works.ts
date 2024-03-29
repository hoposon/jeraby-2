import { computed, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router/auto'
import type { CollectionWorkEnhanced } from '../types'
import { COLLECTION_PAGES } from '../configuration/pages.config'

const configLoading = ref<boolean>(false)
const selectedFilter = ref<string|null>(null)

const works = ref<CollectionWorkEnhanced[]|[]>([])

const collection = ref<string>('')
const id = ref<string>('')

const setSelectedFilter = (filter:string|null) => {
  selectedFilter.value = filter
}

export function useWorksConfig() {
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

  return {
    loadWorksConfig,
    configLoading
  }
}

export function useWorks() {
  const route = useRoute()
  const router = useRouter()

  
  const setFilterForRoute = ({newCollection, newId}: {newCollection?: string, newId?: string}) => {
    collection.value = newCollection
    id.value = newId
    if(collection.value && COLLECTION_PAGES.includes(collection.value)) {
      setSelectedFilter(collection.value)
    }
    
    if (id.value) {
      const work = works.value.find(work => work.id === id.value)
      setSelectedFilter(work?.workState)
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

  const filteredWorks = computed(() => {
    if (selectedFilter.value === 'home') {
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
    setFilterForRoute,
    selectedFilter,
    works,
    filteredWorks,
    homePageWorks,
    availableWorks,
    unavailableWorks,
    setSelectedFilter
  }
}
