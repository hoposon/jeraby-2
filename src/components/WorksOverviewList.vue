<template>
  <div
    class="relative before:hidden sm:before:block before:content-[''] before:bg-[url('/images/presentationsBackground.svg')] before:w-full before:h-[100%] before:absolute before:top-0 before:left-0 before:bg-cover before:bg-no-repeat before:opacity-10"
  >
    <div
      class="demo-content"
    >
      <div
        v-for="collection in collections"
        :key="collection.id"
      >
        <WorkOverview
          v-for="work, index in collection.publishedCollectionWorks"
          :key="work.id"
          :collection-id="collection.id"
          :work="work"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import WorkOverview from './WorkOverview.vue'

  import { useCollections } from '../composables/collections'

  const props = defineProps<{
    collectionId?: string
  }>()

  const { getCollection } = useCollections()

  const collections = computed(() => getCollection(props.collectionId))

</script>

<!-- <style>
  .demo-wrap {
    position: relative;
  }

  .demo-wrap:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-image: url('/images/presentationsBackground.svg');
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
  }

  .demo-content {
    position: relative;
  }
</style> -->