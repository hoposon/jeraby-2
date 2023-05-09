import { ref, computed } from 'vue'
import axios from 'axios'
import { PageHeader } from '../types'



const collections = ref<Collection[]|[]>([])
const publishedCollectionsAll = ref<Collection[]|[]>([])

const configLoading = ref<boolean>(false)

export function useCollections() {

  const loadCollectionsConfig = async () => {
    try {
      configLoading.value = true
      collections.value = (await axios.get('/configuration/collections.json')).data
      collections.value = collections.value.sort((a:Collection, b: Collection) => a.collectionPriority - b.collectionPriority)
      collections.value.forEach((col:Collection) => {
        col.collectionWorks = col.collectionWorks.sort((a:CollectionWork, b: CollectionWork) => a.workPriority - b.workPriority)
      })

      publishedCollectionsAll.value = collections.value.filter(col => col.published)
      publishedCollectionsAll.value.forEach(col => {
        col.publishedCollectionWorks = col.collectionWorks.filter(work => work.published)
      })
    } catch (error) {
      console.log(error)
    } finally {
      configLoading.value = false
    }
  }

  const getCollection = (id?:string) => {
    if (id) {
      return [publishedCollectionsAll.value.find(col => col.id === id)]
    } else {
      return publishedCollectionsAll.value
    }
  }

  const getCollectionsGenInfo = computed(() => {
    return publishedCollectionsAll.value.map(col => {
      return {
        id: col.id,
        title: col.title,
      }
    })
  })
 

  return {
    configLoading,
    collections,
    loadCollectionsConfig,
    getCollection,
    getCollectionsGenInfo
  }
}