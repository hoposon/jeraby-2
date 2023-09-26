<template>
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
        <p class="text-5xl font-extralight w-[75%]">
          <!-- {{ translate() }} -->
          If you contact me, you will make my day much better. But if you don't maybe somebody else will
        </p>
        <div class="flex flex-col text-3xl font-extralight mt-[60px] md:mt-[70px] xl:mt-[120px] mb-[120px] lg:mb-[90px] xl:mb-[120px]">
          <p class="w-full sm:w-[75%] sm:ml-[7%]">
            {{ translate('contact.notes') }}
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
  import PageHeader from '../components/PageHeader.vue'
  import { PAGES_DATA, CONTACT } from '../configuration/pages.config'
  import ContactForm from '../components/ContactForm.vue'
  import { TranslateKey } from '../localizations/localizations'

  const pageHeader = PAGES_DATA[CONTACT].pageHeader

  const translate = inject(TranslateKey, () => '')

</script>