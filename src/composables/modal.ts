import { ref } from 'vue'
import { CollectionWork } from './collections'

export interface ModalData {
  work?: CollectionWork
}

const modalName = ref<string>('')
const modalData = ref<any>(null)

export function useModal() {

  const openModal = (name: string, data: any) => {
    modalName.value = name
    modalData.value = data
  }

  const closeModal = () => {
    modalName.value = ''
    modalData.value = null
  }

  return { 
    modalName,
    modalData,
    openModal,
    closeModal
  }
}

export enum allowedModalNames {
  'WorkContact' = 'WorkContact'
}