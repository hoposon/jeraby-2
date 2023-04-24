import { PageHeader } from '../types'

export const HOME = 'home'
export const ABOUT = 'about'
export const CONTACT = 'contact'

export interface PageDataItem {
  id: string,
  pageHeader?: PageHeader
}

export interface PageData {
  [key: string]: PageDataItem
}

export const PAGES_DATA: PageData = {
  [HOME]: {
    id: HOME,
    pageHeader: {
      title: 'home.title',
      bgImage: '/images/home-jerab.png',
      description: 'home.description',
      classNames: {
        'text': ['text-neutral-300'],
        'menuColor': ['bg-neutral-300'],
        'bg': ['bg-gray-900'],
        'title': ['mt-[15vh]', 'ml-[10vw]', 'text-5xl', 'font-bold'],
        'description': ['ml-[10vw]', 'text-2xl']
      }
    }
  },
  [ABOUT]: {
    id: ABOUT,
    pageHeader: {
      title: 'about.title',
      bgImage: '/images/home-jerab.png',
      description: 'about.description',
      classNames: {
        'bg': ['bg-amber-400'],
        'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
        'description': ['ml-[10%]', 'text-2xl', 'text-gray-800']
      }
    }
  },
  [CONTACT]: {
    id: CONTACT,
    pageHeader: {
      title: 'contact.title',
      bgImage: '/images/home-jerab.png',
      description: 'contact.description',
      classNames: {
        'bg': ['bg-amber-400'],
        'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
        'description': ['ml-[10%]', 'text-2xl', 'text-gray-800']
      }
    }
  }
}