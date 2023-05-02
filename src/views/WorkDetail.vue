<template>
  <PageHeader
    :page="pageHeader"
  />
  <div class="pb-20 pt-[40px] md:pt=[50px] lg:pt-[120px] px-[20px] sm:px-[40px] md:px=[50px] lg:px-[120px] tracking-wider">
    <p class="text-5xl font-extralight w-[75%] mb-14">
      <!-- {{ translate() }} -->
      project your unique vision into space and create your own bomma constellation
    </p>
    <div class="flex text-3xl font-extralight">
      <p class="">
        Handcrafted crystal lighting from Bomma Constellation frees creators, architects and designers to transform interiors. Project your boldest creative visions into space – from smaller compositions to immense constellations. Choose among six original collections: Metamorphosis, Pyrite, Dark & Bright Star, Lens, Soap Mini or Mussels. Like distant stars, these seemingly small lighted objects are unique stand-alone and even stronger in groups. Each single pendant is remarkable in its aesthetics and quality, design and craft.
      </p>
    </div>
  </div>
  
  <Grid
    :items="gridItems"
  />

  <!-- <p class="mt-[50px] mb-[50px] ml-[10%] border-b-8 border-gray-900 w-full text-5xl"> -->
  <p class="mt-[100px] mb-[60px] ml-[5%] sm:ml-[10%] text-6xl">
    {{ translate('see.also.others') }}
  </p>

  <div class="w-full flex justify-center items-center">
    <Gallery
      class="w-[90%]"
      :images="detailImages"
      :gallery-settings="gallerySettings"
      :galleryStyleSettings="galleryStyleSettings"
    />
  </div>
  <div class="w-full h-[100px]" />
</template>

<script setup lang="ts">
  import { computed, ref, watch, inject } from 'vue'
  import PageHeader from '../components/PageHeader.vue'
  import { PAGES_DATA, DETAIL } from '../configuration/pages.config'
  import { GridItem } from '../types'
  import Grid from '../components/Grid.vue'
  import Gallery from '../components/Gallery.vue'
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

  // const detailImages = computed(() => {
  //   return getCollection(collection.value)[0]?.publishedCollectionWorks.find(work => work.id === id.value).detailImages
  // })

  const detailImages = computed(() => {
    return getCollection(collection.value)[0]?.publishedCollectionWorks.map(work => {
      return {
        id: work.id,
        image: work.presentation.presentationImages[1],
        link: `/works/${collection.value}/${work.id}`
      }
    })
  })

  const gallerySettings = computed(() => {
      return PAGES_DATA[DETAIL].otherDetailsGallery?.gallerySettings
  })

  const galleryStyleSettings = computed(() => {
    return PAGES_DATA[DETAIL].otherDetailsGallery?.galleryStyle
  })
  
  const imageUrls = [
        "images/temp/1.jpeg",
        "images/temp/2.jpeg",
        "images/temp/3.jpeg",
        "images/temp/4.jpeg",
        "images/temp/5.jpeg",
        "images/temp/6.jpeg",
        "images/temp/7.jpeg",
        "images/temp/8.jpeg",
        "images/temp/9.jpeg",
        "images/temp/10.jpeg",
        "images/temp/11.jpeg",
        "images/temp/12.jpeg",
        "images/temp/13.jpeg",
        "images/temp/14.jpeg",
        "images/temp/15.jpeg",
  ]

  const gridItems = computed(() => {
    return currentWork.value?.workDetails.gridItems
  })

  watch(
    () => route.params, 
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (newParams) => {
      collection.value = newParams.collection
      id.value = newParams.id
    }
  )

</script>