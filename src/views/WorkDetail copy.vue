<template>
  <PageHeader
    :page="pageHeader"
  />
    <div class="pb-20 pt-[120px] px-[120px] tracking-wider">
      <p class="text-5xl font-extralight w-[75%] mb-14">
        <!-- {{ translate() }} -->
        project your unique vision into space and create your own bomma constellation
      </p>
      <div class="flex text-3xl font-extralight">
        <p class="w-[50%] mr-20">
          Handcrafted crystal lighting from Bomma Constellation frees creators, architects and designers to transform interiors. Project your boldest creative visions into space – from smaller compositions to immense constellations. Choose among six original collections: Metamorphosis, Pyrite, Dark & Bright Star, Lens, Soap Mini or Mussels. Like distant stars, these seemingly small lighted objects are unique stand-alone and even stronger in groups. Each single pendant is remarkable in its aesthetics and quality, design and craft.
        </p>
        <div>
          <p class="mb-2 flex items-center before:block before:mr-4 before:content-[''] before:h-[1px] before:w-[20px] before:border-t-[1px] before:border-gray-900">suitable for any interior</p>
          <p class="mb-2 flex items-center before:block before:mr-4 before:content-[''] before:h-[1px] before:w-[20px] before:border-t-[1px] before:border-gray-900">unlimited arrangement possibilities</p>
          <p class="mb-2 flex items-center before:block before:mr-4 before:content-[''] before:h-[1px] before:w-[20px] before:border-t-[1px] before:border-gray-900">easy installation</p>
        </div>
      </div>
    </div>
    
    <Grid
      :items="items"
    />


    <div class="border-b-[6px] border-gray-900 ml-[80px] text-6xl mt-20">
      {{ translate('See also others') }}
    </div>
    <div class="flex justify-center mt-20">
      <div class="flex flex-row w-[70%] gap-3">
        <button @click="rotate('left')">Prev</button>
        <div
          v-for="work in nextPrevWorks"
          :id="work.id"
          class="w-[30%] rounded-lg overflow-hidden"
          >
          <img
            class="w-full h-[100%] object-cover"
            :src="work.presentation.presentationImages[1].imgPath"
            :alt="work.presentation.presentationImages[1].imgAlt"
          />
        </div>
        <button @click="rotate('right')">Next</button>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch, inject } from 'vue'
  import PageHeader from '../components/PageHeader.vue'
  import { GridItem } from '../types'
  import Grid from '../components/Grid.vue'
  import { useRoute } from 'vue-router'
  import { useCollections } from '../composables/collections'
  import { TranslateKey } from '../localizations/localizations'


  const route = useRoute()
  const collection = ref(route.params.collection)
  const id = ref(route.params.id)
  const { getCollection } = useCollections()
  const translate = inject(TranslateKey, () => '')

  const pageHeader = computed(() => {
    return getCollection(collection.value)[0]?.publishedCollectionWorks.find(work => work.id === id.value).pageHeader
  })

  const currentWork = computed(() => {
    return getCollection(collection.value)[0]?.publishedCollectionWorks.find(work => work.id === id.value)
  })

  const currentCollection = computed(() => {
    return getCollection(collection.value)[0]?.publishedCollectionWorks
  })

  const rotate = (dirr: 'left' | 'right') => {
    if (dirr === 'left') currentId.value -= 1
    else currentId.value += 1
  }

  const currentId = ref(currentCollection.value?.findIndex(work => work.id === id.value))
  console.log('🚀 ~ file: WorkDetail.vue:72 ~ currentCollection.value:', currentCollection.value[0].id)
  console.log('🚀 ~ file: WorkDetail.vue:68 ~ currentId:', currentId.value)
  const nextPrevWorks = computed(() => {
    const prev = currentId.value - 1 < 0 ? currentCollection.value?.length-1 : currentId.value - 1
    console.log('🚀 ~ file: WorkDetail.vue:70 ~ nextPrevWorks ~ prev:', prev)
    const next = currentId.value + 1 > currentCollection.value?.length-1 ? 0 : currentId.value + 1
    console.log('🚀 ~ file: WorkDetail.vue:72 ~ nextPrevWorks ~ next:', next)
    return [currentCollection.value[prev], currentCollection.value[currentId.value], currentCollection.value[next]]
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