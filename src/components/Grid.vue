<template>
  <div
    class="flex flex-row w-full pt-10 border border-gray-900"
    :style="mainStyle"
  >
    <div
      v-for="(colItems, index) in updatedItems"
      :key="index"
      class="flex flex-col overflow-hidden"
      :style="columnWidthStyle(index)"
    >
      <div
        v-for="item in colItems"
        :key="item.id"
        class="rounded-md w-full overflow-hidden"
        :style="`${itemStyle}; height: ${item.height}px;`"
      >
        <img
          v-if="item.image"
          :src="item.image.src"
          :alt="item.image.alt"
          class="object-cover w-full h-[100%]"
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

  const columnsConfig = [{
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
    columns: 3,
    itemMaxHeight: 400,
    padding: 50,
    gap: 1,
  }]

  const currConfig = computed(() => {
    let temp = null
    columnsConfig.forEach((config) => {
      if (window.matchMedia(config.query).matches) {
        temp = config
      }
    })
    return temp
  })
  

  const mainStyle = computed(() => {
    return `padding-left: ${currConfig.value.padding}px; padding-right: ${currConfig.value.padding}px;`
  })

  const columnWidthStyle = (index: number) => {
    let wStyle= ''
    // wStyle = `width: ${(100 - currConfig.value.gap * (currConfig.value.columns - 1)) / currConfig.value.columns}%;`
    wStyle = `width: calc((100% - ${currConfig.value.gap * (currConfig.value.columns - 1)}vw) / ${currConfig.value.columns});`
    if (index === currConfig.value.columns - 1) {
      wStyle = wStyle + ' margin-rigth: 0;'
    } else {
      wStyle = wStyle + ` margin-right: ${currConfig.value.gap}vw;`
    }
    return wStyle
  }

  const itemStyle = computed(() => {
    return `margin-bottom: ${currConfig.value.gap}vw;`
  })

  const updatedItems = ref(null)
  const generateColumns = () => {
    let heightsSum = 0
    const addHeight = props.items.map((item) => {
      // const itemHeight = Math.floor(currConfig.value.itemMaxHeight / (Math.floor(Math.random() * 3) + 1))
      const temp = Math.floor(Math.random() * currConfig.value.itemMaxHeight)
      const itemHeight = temp < 150 ? 150 : temp
      console.log('🚀 ~ file: Grid.vue:107 ~ addHeight ~ itemHeight:', itemHeight)
      heightsSum += itemHeight
      return {
        ...item,
        height: itemHeight
      }
    })

    const averageHeight = Math.floor(heightsSum / currConfig.value.columns)
    console.log('🚀 ~ file: Grid.vue:116 ~ generateColumns ~ averageHeight:', averageHeight)

    let columnHight = 0
    let column = 0
    const addColumn = addHeight.map((item) => {
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

    updatedItems.value = addColumn.reduce((accumulator, item) => {
      if (accumulator[item.column]) {
        accumulator[item.column].push(item)
      } else {
        accumulator[item.column] = [item]
      }
      return accumulator
    }, [])
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