<template>
  <Transition name="fade">
    <nav
      class="fixed flex w-full h-full sm:h-[35vh] z-[10000] justify-center pl-[10vw] sm:pr-[150px] pt-12 sm:pt-[10vh] bg-neutral-300 sm:bg-neutral-300/90 transition-all duration-500 ease-in-out"
      :class="navClassNames"
    >
      <div
        class="flex flex-col sm:flex-row w-full sm:justify-between text-gray-900"
      >
        <div>
          <Link
            :text="'Michaela Houf'"
            :link="'/'"
            class="text-[25px] font-bold"
            @click="closeNav()"
          />
        </div>
        <div class="flex flex-col sm:flex-row sm:space-x-[80px]">
          <div class="flex flex-col max-sm:mt-6">
            <div 
              class="flex items-center text-gray-900/60 after:content-[''] after:inline-block after:w-[25px] after:h-[1px] after:bg-gray-900/60 after:ml-2"
            >
              {{ translate('nav.works') }}
            </div>
            <div class="mt-1">
              <div
                v-for="col in getCollectionsGenInfo"
                :key="col.id"
                class="max-sm:ml-16"
              >
                <Link
                  :text="translate(col.title)"
                  :link="`/works/${col.id}`"
                  @click="closeNav()"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col max-sm:mt-6">
            <div class="flex items-center text-gray-900/60 after:content-[''] after:inline-block after:w-[25px] after:h-[1px] after:bg-gray-900/60 after:ml-2">
              {{ translate('nav.menu') }}
            </div>
            <div class="flex flex-col mt-1 max-sm:ml-16">
              <div>
                <Link
                  :text="translate('nav.about')"
                  :link="'/about'"
                  class="mt-1"
                  @click="closeNav()"
                />
              </div>
              <div>
                <Link
                  :text="translate('nav.contact')"
                  :link="'/contact'"
                  @click="closeNav()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button 
        class="absolute top-[3rem] right-10 bg-close-default hover:bg-close-hover bg-center bg-cover w-10 h-10 transition-all duration-500 ease-in-out"
        @click="closeNav()"
      />
    </nav>
  </Transition>
</template>

<script setup lang="ts">
import { inject } from 'vue'
  import { useNavigation } from '../composables/navigation'
  import { useCollections } from '../composables/collections'
  import { TranslateKey } from '../localizations/localizations'
  import Link from './Link.vue'

  const { 
    navClassNames,
    closeNav } = useNavigation()

  const translate = inject(TranslateKey, () => '')

  const { getCollectionsGenInfo } = useCollections()


</script>