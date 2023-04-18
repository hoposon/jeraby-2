<template>
  <PageHeader
    :page="pageHeader"
  />
  <Grid
    :items="items"
  />
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import PageHeader from '../components/PageHeader.vue'
  import { GridItem } from '../types'
  import Grid from '../components/Grid.vue'
  import { useRoute } from 'vue-router'
  import { useCollections } from '../composables/collections'

  const route = useRoute()
  const collection = ref(route.params.collection)
  const id = ref(route.params.id)
  const { getCollection } = useCollections()

  const pageHeader = computed(() => {
    return getCollection(collection.value)[0]?.publishedCollectionWorks.find(work => work.id === id.value).pageHeader
    
  })

  const items: GridItem[] = [{
    id: '1',
    image: {
      src: 'images/collections/jeraby/jeraby-4/1.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '2',
    title: 'Title 1',
    description: {
      size: 'small'
    }
  }, {
    id: '3',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '4',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '5',
    image: {
      src: 'images/collections/jeraby/jeraby-4/1.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '15',
    title: 'Title 1',
    description: {
      size: 'small'
    }
  }, {
    id: '6',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '7',
    image: {
      src: 'images/collections/jeraby/jeraby-4/1.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '8',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '9',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '10',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '11',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '12',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }

  ]

  watch(
    () => route.params, 
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (newParams) => {
      collection.value = newParams.collection
      id.value = newParams.id
    }
  )

</script>