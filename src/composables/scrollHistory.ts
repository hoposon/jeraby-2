import { ref } from 'vue'

export interface ScrollHistoryItem {
  path: string
  scroll: number
}
const scrollHistory = ref<ScrollHistoryItem>([])

export const useScrollHistory = () => {
  const getScrollHistory = (routePath: string) => {
    return scrollHistory.value.find((item: ScrollHistoryItem) => item.path === routePath)
  }
  const setScrollHistory = (routePath: string, scroll: number) => {
    const index = scrollHistory.value.findIndex((item: ScrollHistoryItem) => item.path === routePath)
    if (index === -1) {
      scrollHistory.value.push({ path: routePath, scroll })
    } else {
      scrollHistory.value[index].scroll = scroll
    }

    if (scrollHistory.value.length > 2) {
      scrollHistory.value.shift()
    }
  }
  return {
    scrollHistory,
    getScrollHistory,
    setScrollHistory,
  }
}