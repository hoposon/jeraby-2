<template>
  <div
    class="flex flex-row w-full"
    :style="mainStyle"
  >
    <div
      v-for="(colItems, index) in updatedItems"
      :key="index"
      class="flex flex-col overflow-hidden"
      :style="columnStyle(index)"
    >
      <div
        v-for="item in colItems"
        :key="item.id"
        class="rounded-md w-full overflow-hidden"
        :class="{'bg-neutral-300/10 shadow-md': item.type === 'TEXT'}"
        :style="itemStyle(item)"
      >
        <img
          v-if="item.image"
          :src="item.image.imgPath"
          :alt="translate(item.image.imgAlt)"
          class="object-cover w-full h-[100%] cursor-pointer"
          @click="emit('click-item', {id: item.id})"
        >
        <div 
          v-else
          class="flex flex-col p-4"
        >
          <h3 class="text-2xl font-medium text-[#DF442F] mb-3">
            {{ translate(item.title) }}
          </h3>
          <p 
            v-if="item.description?.size"
            class="text-md mb-3">
            {{ translate(item.description?.size) }}
          </p>
          <p
            v-if="item.description?.text" 
            class="text-md">
            {{ translate(item.description?.text) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
  import { TranslateKey } from '../localizations/localizations'

  import type { GridItem } from '../types'

  interface Props {
    items: GridItem[]
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    (e: 'click-item', { id }: {id: string} ): void
  }>()

  const translate = inject(TranslateKey, () => '')

  const columnsConfig = [{
    query: '(max-width: 767px)',
    columns: 2,
    itemMaxHeight: 500,
    itemMinHeight: 200,
    padding: 20,
    gap: 2
  }, {
    query: '(min-width: 768px)',
    columns: 3,
    itemMaxHeight: 500,
    itemMinHeight: 200,
    padding: 20,
    gap: 2
  }, {
    query: '(min-width: 1024px)',
    columns: 3,
    itemMaxHeight: 500,
    itemMinHeight: 200,
    padding: 80,
    gap: 1,
  }, {
    query: '(min-width: 1536px)',
    columns: 4,
    itemMaxHeight: 500,
    itemMinHeight: 200,
    padding: 80,
    gap: 1,
  }]

  const currConfig = ref(columnsConfig[2])

  const matchM = () => {
  columnsConfig.forEach((config) => {
    if (window.matchMedia(config.query).matches) {
      currConfig.value = config
    }
  })
}
  const updatedItems = computed(() => {

    columnsConfig.forEach((config) => {
      if (window.matchMedia(config.query).matches) {
        currConfig.value = config
      }
    })

    let heightsSum = 0
    const addHeight = props.items.map((item) => {
      if (item.type === 'TEXT') {

      }
      const temp = Math.floor(Math.random() * currConfig.value.itemMaxHeight)
      const itemHeight = temp < currConfig.value.itemMinHeight ? currConfig.value.itemMinHeight : temp
      // console.log('🚀 ~ file: Grid.vue:107 ~ addHeight ~ itemHeight:', itemHeight)
      heightsSum += itemHeight
      return {
        ...item,
        height: itemHeight
      }
    })

    const averageHeight = Math.floor(heightsSum / currConfig.value.columns)
    // console.log('🚀 ~ file: Grid.vue:116 ~ generateColumns ~ averageHeight:', averageHeight)

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

    const final = addColumn.reduce((accumulator, item) => {
      if (accumulator[item.column]) {
        accumulator[item.column].push(item)
      } else {
        accumulator[item.column] = [item]
      }
      return accumulator
    }, [])

    return final
  })



  const mainStyle = computed(() => {
    // return `padding-left: ${currConfig.value.padding}px; padding-right: ${currConfig.value.padding}px;`
    return ''
  })

  const columnStyle = (index: number) => {
    let cStyle = `width: calc((100% - ${currConfig.value.gap * (currConfig.value.columns - 1)}vw) / ${currConfig.value.columns});`
    if (index === currConfig.value.columns - 1) {
      cStyle += ' margin-rigth: 0;'
    } else {
      cStyle += ` margin-right: ${currConfig.value.gap}vw;`
    }

    // if (index % 2 === 0) {
    //   cStyle += ` margin-top: -100px`
    // }
    return cStyle
  }

  const itemStyle = (item: GridItem) => {
    let style = `margin-bottom: ${currConfig.value.gap}vw;`
    if (item.type === 'TEXT') {
      style = `${style} height: "fit-content"`
    } else {
      style = `${style} height: ${item.height}px;`
    }
    // console.log('🚀 ~ file: Grid.vue:98 ~ itemStyle ~ style:', style)
    return style
  }

  onMounted(() => {
    matchM()
    window.addEventListener('resize', matchM)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', matchM)
  })
  
</script>

<style>
 
</style>