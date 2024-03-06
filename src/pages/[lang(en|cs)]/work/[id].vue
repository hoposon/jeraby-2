<template>
  <Head>
    <title>{{ translate(pageHeader?.title) }}</title>
    <meta 
      name="description" 
      :content="translate(currentWork?.workDetails.mainText || '')"
    />
  </Head>
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
        <p 
          class="text-4xl sm:text-5xl font-extralight w-[75%]" 
          v-html="translate(currentWork?.workDetails.mainText || '')"
        />
        <div class="flex items-center flex-col lg:flex-row text-2xl sm:text-3xl font-extralight mt-[60px] md:mt-[70px] xl:mt-[120px] mb-[60px] sm:mb-[100px] lg:mb-[90px] xl:mb-[120px]">
          <p 
            class="w-full mb-[10px] sm:mb-[70px] lg:mb-0 lg:w-[50%] lg:mr-[100px] 2xl:w-[60%]"
            v-html="translate(currentWork?.workDetails.smallText || '')"
          />
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
              :link="`/${locale}/works/${selectedFilter}`" 
            />
          </div>
          <div>
            <span>{{translate('change.to.collection')}}&nbsp;</span>
            <Link 
              :text="translate(`collection.link.${alternativCollection}`)" 
              :link="`/${locale}/works/${alternativCollection}`" 
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
  import { computed, inject, ref, onMounted } from 'vue'
  import { useRoute, onBeforeRouteUpdate } from 'vue-router/auto'
  import { Head } from '@unhead/vue/components'
  
  // import PageHeader from '../components/PageHeader.vue'
  // import { PAGES_DATA, DETAIL } from '../configuration/pages.config'
  // import Grid from '../components/Grid.vue'
  // import Gallery from '../components/Gallery.vue'
  // import WorkOverviewSummary from '../components/WorkOverviewSummary.vue'
  // import Link from '../components/Link.vue'
  // import { useWorks } from '../composables/works'
  // import { TranslateKey } from '../localizations/localizations'
  // import { useModal, allowedModalNames } from '../composables/modal'


  const route = useRoute()
  const id = ref(route.params.id)
  const { filteredWorks, selectedFilter, setFilterForRoute } = useWorks()
  const translate = inject(TranslateKey, () => '')
  const { locale } = useLocalizations()
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
        link: `/${locale.value}/work/${work.id}`
      }
    })
  })

  const gridItems = computed(() => {
    return currentWork.value?.workDetails.gridItems || []
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

  onBeforeRouteUpdate((to) => {
    id.value = to.params.id
    setFilterForRoute({newId: to.params.id})
  })

  onMounted(() => {
    setFilterForRoute({newId: route.params.id})
  })

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