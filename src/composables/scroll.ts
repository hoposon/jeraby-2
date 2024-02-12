import { onMounted, onUnmounted, ref } from 'vue'

export interface ScrollData {
  direction: 'up' | 'down'
}

export type ScrollFunction = (data: ScrollData) => void

const subscribers: ScrollFunction[] = []

const windowPosition = ref<number>(0)

const isScrolling = ref<boolean>(false)

export function useScroll() {
  if (typeof window === 'undefined') {return}
  windowPosition.value = window.scrollY
  const onScroll = () => {
    if (isScrolling.value) return
    
    if(window.scrollY > windowPosition.value) {
      subscribers.forEach((subscriber) => subscriber({ direction: 'down' }))
    } else if (window.scrollY < windowPosition.value) {
      subscribers.forEach((subscriber) => subscriber({ direction: 'up' }))
    }
    windowPosition.value = window.scrollY

    isScrolling.value = true
    setTimeout(() => {
      isScrolling.value = false
    }, 100)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    subscribe: (subscriber: ScrollFunction) => {
      subscribers.push(subscriber)
    },
  }
}