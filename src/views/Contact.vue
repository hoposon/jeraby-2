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
          <p class="w-full mb-[70px] sm:w-[75%] sm:ml-[7%]">
            If you have any message or question for me, please use this contact form. And of course you can use it for questions or demands for a specific works, but it is much easier for you to do this from the work detail or from the work presentation on the home/collection page where you can hit the black button which opens a contact form as well but we now which work your inquiry is ralated to without you having to specify it.
          </p>
          <p class="w-full sm:w-[75%] sm:ml-[14%]">
            If you have any message or question for me, please use this contact form. And of course you can use it for questions or demands for a specific works, but it is much easier for you to do this from the work detail or from the work presentation on the home/collection page where you can hit the black button which opens a contact form as well but we now which work your inquiry is ralated to without you having to specify it.
          </p>
        </div>
      </div>
      <div
        class="max-w-[800px] mx-auto"
      >
        <h3
          class="w-100 text-4xl text-center text-[#DF442F] mb-6"
        >
          {{ translate('contact.form') }}
        </h3>
        <ContactForm />
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