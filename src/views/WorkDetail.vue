<template>
  <PageHeader
    :page="pageHeader"
  />
  <div
    class="max-w-[1800px] mx-auto"
  >
    <div
      class="px-[20px] sm:px-[40px] md:px-[50px] xl:px-[120px]"
    >
      <div class="mt-[40px] md:mt-[50px] xl:mt-[120px] tracking-wider">
        <p class="text-5xl font-extralight w-[75%]">
          <!-- {{ translate() }} -->
          project your unique vision into space and create your own bomma constellation
        </p>
        <div class="flex items-center flex-col lg:flex-row text-3xl font-extralight mt-[60px] md:mt-[70px] xl:mt-[120px] mb-[120px] lg:mb-[90px] xl:mb-[120px]">
          <p class="w-full mb-[70px] lg:mb-0 lg:w-[50%] lg:mr-[100px] 2xl:w-[60%]">
            Handcrafted crystal lighting from Bomma Constellation frees creators, architects and designers to transform interiors. Project your boldest creative visions into space – from smaller compositions to immense constellations. Choose among six original collections: Metamorphosis, Pyrite, Dark & Bright Star, Lens, Soap Mini or Mussels. Like distant stars, these seemingly small lighted objects are unique stand-alone and even stronger in groups. Each single pendant is remarkable in its aesthetics and quality, design and craft.
          </p>
          <div
            class="w-full lg:w-[50%] 2xl:w-[40%] flex justify-start"
          >
            <WorkOverviewSummary
              :work="currentWork"
              :detailsButton="false"
              :doPositioning="false"
              class="px-0"
            />
          </div>
        </div>
      </div>
      
      <Grid
        :items="gridItems"
        @click-item="openDetail"
      />

      <div
        class="w-[90%] 2xl:w-[70%] mx-auto"
      >
        <p class="mt-[100px] ml-[10px] md:ml-[20px] text-6xl">
          {{ translate('see.also.others') }}
        </p>
        <div
          class="flex flex-col ml-[10px] md:ml-[20px] mb-[60px]"
        >
          <div>
            <span>{{translate('you.are.browsing.collection')}}&nbsp;</span>
            <Link 
              :text="translate(`collection.link.${selectedFilter}`)" 
              :link="`/works/${selectedFilter}`" 
            />
          </div>
          <div>
            <span>{{translate('change.to.collection')}}&nbsp;</span>
            <Link 
              :text="translate(`collection.link.${alternativCollection}`)" 
              :link="`/works/${alternativCollection}`" 
            />
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <Gallery
            :images="detailImages"
            :initialSlide="currentWorkIndex"
            :gallery-settings="gallerySettings"
            :galleryStyleSettings="galleryStyleSettings"
          />
        </div>
      </div>
      <div class="w-full h-[100px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch, inject } from 'vue'
  import PageHeader from '../components/PageHeader.vue'
  import { PAGES_DATA, DETAIL } from '../configuration/pages.config'
  import Grid from '../components/Grid.vue'
  import Gallery from '../components/Gallery.vue'
  import WorkOverviewSummary from '../components/WorkOverviewSummary.vue'
  import Link from '../components/Link.vue'
  import { useRoute } from 'vue-router'
  import { useWorks } from '../composables/works'
  import { TranslateKey } from '../localizations/localizations'
  import { useModal, allowedModalNames } from '../composables/modal'


  const route = useRoute()
  const id = ref(route.params.id)
  const { filteredWorks, selectedFilter } = useWorks()
  const translate = inject(TranslateKey, () => '')
  const { openModal } = useModal()

  const openDetail = (data: {id: string}) => {
    openModal(allowedModalNames.WorkDetailGallery, {work: currentWork.value, currentDetail: data.id})
  }

  const pageHeader = computed(() => {
    return filteredWorks.value.find(work => work.id === id.value)?.pageHeader
  })

  const currentWork = computed(() => {
    return filteredWorks.value.find(work => work.id === id.value)
  })

  const currentWorkIndex = computed(() => {
    return filteredWorks.value.findIndex(work => work.id === id.value)
  })

  const detailImages = computed(() => {
    return filteredWorks.value.map(work => {
      return {
        id: work.id,
        image: work.presentation.presentationImages[1],
        link: `/work/${work.id}`
      }
    })
  })

  const gridItems = computed(() => {
    return currentWork.value?.workDetails.gridItems
  })

  const gallerySettings = computed(() => {
    return PAGES_DATA[DETAIL].otherDetailsGallery?.gallerySettings
  })

  const galleryStyleSettings = computed(() => {
    return PAGES_DATA[DETAIL].otherDetailsGallery?.galleryStyle
  })

  const alternativCollection = computed(() => {
    return selectedFilter.value === 'available' ? 'unavailable' : 'available'
  })

  watch(
    () => route.params, 
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (newParams) => {
      id.value = newParams.id
    }
  )

</script>

<style>
  .carousel__item {
    width: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel__slide {
    padding: 10px;
    @media screen and (min-width: 768px) {
      padding: 20px;
    }
  }
</style>