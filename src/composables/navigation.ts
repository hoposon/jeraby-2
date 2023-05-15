import { ref } from 'vue'
import { ScrollData } from '../composables/scroll'

const navClassNames = ref<string[]|[]>(['md:-translate-y-[35vh]', '-translate-y-[100vh]'])
const navState = ref<string>('closed')

const navScrollWatcherState = ref<string>('closed')
const navScrollClassNames = ref<string[]|[]>(['-translate-y-[55px]'])
const headerInViewport = ref<boolean>(false)


export const useNavigation = () => {
  
  const openNav = () => {
    if (navState.value === 'closed') {
      navState.value = 'opened'
      navClassNames.value = []
      navScrollClassNames.value = ['-translate-y-[55px]']
    }
    
  }
  const closeNav = () => {
    if (navState.value === 'opened') {
      navState.value = 'closed'
      navClassNames.value = ['md:-translate-y-[35vh]', '-translate-y-[100vh]']
    }
  }

  const setHeaderInViewport = (data: IntersectionObserverEntry[]) => {
    if (data[0].isIntersecting) {
      headerInViewport.value = true
      handleScroll()
    } else {
      headerInViewport.value = false
    }
  }

  const handleScroll = (data?: ScrollData) => {
    if (data?.direction === 'up' && !headerInViewport.value && navState.value === 'closed') {
      navScrollClassNames.value = []
    } else {
      navScrollClassNames.value = ['-translate-y-[55px]']
    }
  }

  return {
    navClassNames,
    navState,
    openNav,
    closeNav,
    navScrollClassNames,
    navScrollWatcherState,
    handleScroll,
    setHeaderInViewport
  }
}