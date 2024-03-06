<template>
  <Head>
    <title>{{ translate('contact.metaTitle') }}</title>
    <meta 
      name="description" 
      :content="translate('contact.metaDescription')"
    />
  </Head>
  <PageHeader
    :page="pageHeader"
  />
  <div
    class="max-w-[2000px] mx-auto"
  >
  <div
      class="px-[20px] sm:px-[40px] md:px-[50px] xl:px-[120px]"
    >
      <div class="mt-[40px] md:mt-[50px] xl:mt-[120px] tracking-wider">
        <p class="text-4xl sm:text-5xl font-extralight w-[75%]">
          {{ translate('contact.main.text') }}
        </p>
        <div class="flex flex-col text-2xl sm:text-3xl font-extralight mt-[60px] md:mt-[70px] xl:mt-[120px] mb-[60px] sm:mb-[100px] lg:mb-[90px] xl:mb-[120px]">
          <p class="w-full sm:w-[75%] sm:ml-[7%]">
            {{ translate('contact.small.text') }}
          </p>
        </div>
      </div>
      <div
        class="max-w-[800px] mx-auto mb-10"
      >
        <h3
          class="w-100 text-4xl text-center text-[#DF442F] mb-6"
        >
          {{ translate('contact.form') }}
        </h3>
        <ContactForm 
          contact-subject="Jeraby, kontakt"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { Head } from '@unhead/vue/components'

  const pageHeader = PAGES_DATA[CONTACT].pageHeader
  const translate = inject(TranslateKey, () => '')


</script>