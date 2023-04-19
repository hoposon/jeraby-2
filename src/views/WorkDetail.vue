<template>
  <PageHeader
    :page="pageHeader"
  />
  <!-- <div class="relative"> -->
  <div
    class="before:block before:content-[''] before:bg-[url('/images/presentationsBackground.svg')] before:w-full before:h-[100%] before:absolute before:top-0 before:left-0 before:bg-cover before:bg-no-repeat before:opacity-10"
  >
    <Grid
      :items="items"
    />
  </div>
<!-- </div> -->
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
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/1.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '2',
    type: 'TEXT',
    title: 'Title 1',
    description: {
      size: 'small'
    }
  }, {
    id: '3',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '4',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '5',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/1.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '15',
    type: 'TEXT',
    title: 'Title 1',
    description: {
      size: 'small',
      desc: 'this is a jeraby picture, which shows how ... Color scheme was done with a reference to .... It is a very nice picture that I like the'
    }
  }, {
    id: '6',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '7',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/1.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '8',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '9',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '10',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '11',
    type: 'IMG',
    image: {
      src: 'images/collections/jeraby/jeraby-4/2.jpg',
      alt: 'Image 1',
    }
  }, {
    id: '12',
    type: 'IMG',
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