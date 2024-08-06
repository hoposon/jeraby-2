import { onMounted, onUnmounted, ref } from 'vue'

export interface ScrollData {
  direction: 'up' | 'down'
}

type ScrollFunction = (data: ScrollData) => void

const subscribers: ScrollFunction[] = []

const windowPosition = ref<number>(window.pageYOffset)

const isScrolling = ref<boolean>(false)

export function useScroll() {
  const onScroll = () => {
    if (isScrolling.value) return
    
    if(window.pageYOffset > windowPosition.value) {
      subscribers.forEach((subscriber) => subscriber({ direction: 'down' }))
    } else if (window.pageYOffset < windowPosition.value) {
      subscribers.forEach((subscriber) => subscriber({ direction: 'up' }))
    }
    windowPosition.value = window.pageYOffset

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