<template>
  <PageHeader
    :page="pageHeader"
  />
  <div
    class="max-w-[2000px] mx-auto"
  >
    <div
      class="px-[20px] sm:px-[40px] md:px-[50px] xl:px-[120px] mb-10"
    >
      <div
        class="flex flex-col sm:flex-row mt-[90px]"
      >
        <div
          class="w-full sm:w-[50%] mr-0 sm:mr-[10vw] mb-10"
        >
          <h3 class="text-5xl">{{ translate('about.bio.heading') }}</h3>
          <p class="text-2xl mt-6 font-extralight text-justify">{{ translate('about.bio.1') }}</p>
          <p class="text-2xl font-semibold mt-6 mb-6">{{ translate('about.bio.2') }}</p>
          <p class="text-2xl font-extralight text-justify">{{ translate('about.bio.3') }}</p>
        </div>
        <div
          class="w-full sm:w-[50%]"
        >
          <img src="/images/michaela.jpg" />
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row mt-[10vh]"
      >
        <div
          class="w-full sm:w-[50%] mr-0 sm:mr-[10vw]"
        >
          <h4 class="text-5xl">{{ translate('about.how.heading') }}</h4>
          <p class="text-2xl mt-4 font-extralight text-justify">{{ translate('about.how.1') }}</p>
        </div>
        <div
          class="w-full sm:w-[50%] mt-10 sm:mt-0"
        >
          <h4 class="text-5xl">{{ translate('about.contact.me.heading') }}</h4>
          <p class="text-2xl mt-4 font-extralight text-justify">{{ translate('about.contact.me.1') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import PageHeader from '../components/PageHeader.vue'
  import { PAGES_DATA, ABOUT } from '../configuration/pages.config'
  import { TranslateKey } from '../localizations/localizations'

  const pageHeader = PAGES_DATA[ABOUT].pageHeader

  const translate = inject(TranslateKey, () => '')

</script>