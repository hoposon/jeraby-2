<template>
  <div
    class="flex flex-row w-full pt-10"
    :style="mainClass"
  >
    <div
      v-for="(colItems, index) in updatedItems"
      :key="index"
      class="flex flex-col overflow-hidden"
      :style="columnWidthClass(index)"
    >
      <div
        v-for="item in colItems"
        :key="item.id"
        class="border-2 border-gray-900 w-full"
        :data-test="logg(item)"
      >
        <img
          v-if="item.image"
          :src="item.image.src"
          :alt="item.image.alt"
          class="object-cover w-full v-[100%]"
        >
        <div 
          v-else
          class="p-4"
        >
          <h3 class="text-2xl font-bold">
            {{ item.title }}
          </h3>
          <p class="text-sm">
            {{ item.description?.size }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, onBeforeUnmount, computed } from 'vue'

  import { GridItem } from '../types'

  interface Props {
    items: GridItem[]
  }

  const props = defineProps<Props>()

  const logg = (item) => {
    console.log(item.id)
  }

  const columnsConfig = ref([{
    query: '(max-width: 767px)',
    columns: 2,
    itemMaxHeight: 100,
    padding: 5,
    gap: 2
  }, {
    query: '(min-width: 768px)',
    columns: 3,
    itemMaxHeight: 200,
    padding: 5,
    gap: 2
  }, {
    query: '(min-width: 1024px)',
    columns: 4,
    itemMaxHeight: 300,
    padding: 2,
    gap: 2
  } ])

  const currConfig = ref(columnsConfig.value[2])
  const updatedItems = ref(null)
  

  const mainClass = computed(() => {
    // return `px-[${currConfig.value.padding}%]`
    return `padding-left: ${currConfig.value.padding}%; padding-right: ${currConfig.value.padding}%;`
  })

  const columnWidthClass = (index: number) => {
    console.log('🚀 ~ file: Grid.vue:79 ~ columnWidthClass ~ index:', index)
    let wClass = ''
    // wClass = `w-[${Math.floor((100 - currConfig.value.padding * 2 - currConfig.value.gap * (currConfig.value.columns - 1)) / currConfig.value.columns)}%]`
    // // wClass = wClass + ` w-max-[${Math.floor((100 - currConfig.value.padding * 2 - currConfig.value.gap * (currConfig.value.columns - 1)) / currConfig.value.columns)}%]`
    // if (index === currConfig.value.columns - 1) {
    //   wClass = wClass + ' mr-0'
    // } else {
    //   wClass = wClass + ` mr-[${currConfig.value.gap}%]`
    // }

    wClass = `width: ${Math.floor((100 - currConfig.value.padding * 2 - currConfig.value.gap * (currConfig.value.columns - 1)) / currConfig.value.columns)}%;`
    // wClass = wClass + ` w-max-[${Math.floor((100 - currConfig.value.padding * 2 - currConfig.value.gap * (currConfig.value.columns - 1)) / currConfig.value.columns)}%]`
    if (index === currConfig.value.columns - 1) {
      wClass = wClass + ' margin-rigth: 0;'
    } else {
      wClass = wClass + ` margin-right: ${currConfig.value.gap}%;`
    }
    return wClass
  }

  const generateColumns = () => {
    
    columnsConfig.value.forEach((config) => {
      if (window.matchMedia(config.query).matches) {
        currConfig.value = config
      }
    })

    console.log('🚀 ~ file: Grid.vue:351 ~ generateColumns ~ currConfig.value:', currConfig.value)
    // columnWidthClass.value = `w-[${(100 - currConfig.value.padding * 2 - currConfig.value.gap * (currConfig.value.columns - 1)) / currConfig.value.columns}%]`
    // columnWidthClass.value = columnWidthClass.value + ` w-max-[${(100 - currConfig.value.padding * 2 - currConfig.value.gap * (currConfig.value.columns - 1)) / currConfig.value.columns}%]`
    // console.log('🚀 ~ file: Grid.vue:369 ~ generateColumns ~ columnWidthClass.value:', columnWidthClass.value)
    
    let heightsSum = 0
    updatedItems.value = props.items.map((item) => {
      const itemHeight = Math.floor(currConfig.value.itemMaxHeight / (Math.floor(Math.random() * 5) + 1))
      // console.log('🚀 ~ file: Grid.vue:374 ~ updatedItems.value=props.items.map ~ itemHeight:', itemHeight)
      heightsSum += itemHeight
      return {
        ...item,
        // column,
        // row,
        height: itemHeight
      }
    })

    const averageHeight = Math.floor(heightsSum / currConfig.value.columns)
    // console.log('🚀 ~ file: Grid.vue:385 ~ generateColumns ~ averageHeight:', averageHeight)

    let columnHight = 0
    let column = 0
    updatedItems.value = updatedItems.value.map((item) => {
      let col = 0
      if (columnHight < averageHeight) {
        col = column
        columnHight = columnHight + item.height
      } else if (columnHight > averageHeight && (column + 1) < currConfig.value.columns) {
        column = column + 1
        col = column
        columnHight = item.height
      } else {
        col = column
      }
      return {
        ...item,
        column: col,
      }
    })

    updatedItems.value = updatedItems.value.reduce((accumulator, item) => {
      if (accumulator[item.column]) {
        accumulator[item.column].push(item)
      } else {
        accumulator[item.column] = [item]
      }
      return accumulator
    }, [])
    console.log('🚀 ~ file: Grid.vue:154 ~ updatedItems.value=updatedItems.value.reduce ~ updatedItems.value:', updatedItems.value)

  }

  onMounted(() => {
    generateColumns()
    window.addEventListener('resize', generateColumns)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', generateColumns)
  })

</script>

<style>
 
</style>