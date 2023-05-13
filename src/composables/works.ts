import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { CollectionWorkEnhanced } from '../types'

const configLoading = ref<boolean>(false)
const selectedFilter = ref<string|null>(null)

const works = ref<CollectionWorkEnhanced[]|[]>([])

const collection = ref<string>('')
const id = ref<string>('')

export function useWorks() {
  const route = useRoute()

  watch(
    () => route.params, 
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (newParams) => {
      collection.value = newParams.collection
      id.value = newParams.id
      if(collection.value) {
        setSelectedFilter(collection.value)
      } else if (id.value) {
        const work = works.value.find(work => work.id === id.value)
        setSelectedFilter(work?.workState)
      } else {
        setSelectedFilter('home')
      }
    }
  )

  const loadWorksConfig = async () => {
    try {
      configLoading.value = true
      works.value = (await axios.get('/configuration/works.json')).data
      works.value = works.value.sort((a:CollectionWorkEnhanced, b: CollectionWorkEnhanced) => a.priority - b.priority)
      works.value = works.value.filter(work => work.published)
    } catch (error) {
      console.log(error)
    } finally {
      if (id.value) {
        const work = works.value.find(work => work.id === id.value)
        setSelectedFilter(work?.workState)
      }
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
    selectedFilter.value = filter
  }

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
