import { ref, computed } from 'vue'
import axios from 'axios'
import { PageHeader } from '../types'

export interface WorkDetailText {
  title: string,
  substitle: string,
  text: string
}

export interface GridItem {
  id: string,
  type: 'TEXT'|'IMAGE',
  title?: string,
  description?: {
    size?: string,
    text?: string
  },
  image?: {
    imgPath: string,
    imgAlt: string,
  }
}


export interface CollectionWork {
  id: string,
  published: boolean,
  pageHeader: PageHeader,
  title: string,
  workState: 'sold'|'available',
  workPriority: number,
  presentation: {
    presentationDescription: string,
    presentationImages: {imgPath: string, imgAlt: string}[],
    presentationType: 'oneLeft'|'oneRight'|'twoImages',
    classNames: {
      [key: string]: string
    },
  },
  workDetails: {
    gridItems: GridItem[]
  }
}

export interface Collection {
  id: string,
  pageHeader: PageHeader,
  title: string,
  description?: string,
  collectionPriority: number,
  published: boolean,
  classNames: {
    header: {
      [key: string]: string
    }
  },
  collectionWorks: CollectionWork[],
  publishedCollectionWorks: CollectionWork[],
}

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

  // const publishedCollectionsAll = computed(() => {
  //   return (collections.value.filter(col => col.published)).forEach(col => {
  //     col.publishedCollectionWorks = col.collectionWorks.filter(work => work.published)
  //   })
  // }) 

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