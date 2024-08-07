import { PageHeader } from '../types'

export const HOME = 'home'
export const ABOUT = 'about'
export const CONTACT = 'contact'
export const DETAIL = 'detail'
export const COLLECTION_AVAILABLE = 'available'
export const COLLECTION_UNAVAILABLE = 'unavailable'

export interface PageDataItem {
  id: string,
  pageHeader?: PageHeader,
  otherDetailsGallery?: {
    gallerySettings: {
      itemsToShow: number,
      snapAlign: string,
      wrapAround: boolean,
      breakpoints: {
        [key: number]: {
          itemsToShow: number,
          snapAlign: string,
        }
      }
    },
    galleryStyle: {
      carouselItem: string
    }
  },
  detailGallery?: {
    gallerySttings: {
      itemsToShow: number,
      snapAlign: string,
      wrapAround: boolean,
      breakpoints: {
        [key: number]: {
          itemsToShow: number,
          snapAlign: string,
        }
      }
    },
    galleryStyle: {
      carouselItem: string
    }
  }
}

export interface PageData {
  [key: string]: PageDataItem
}

export const PAGES_DATA: PageData = {
  [HOME]: {
    id: HOME,
    pageHeader: {
      title: 'home.title',
      // bgImage: '/images/crane-icon-white.png',
      bgImage: '/images/crane-icon-white.png',
      description: 'home.description',
      classNames: {
        'text': ['text-neutral-300'],
        'menuColor': ['bg-neutral-300'],
        'bg': ['bg-gray-900'],
        'title': ['mt-[10vh]', 'md:mt-[1vh]', 'text-5xl', 'font-bold'],
        'description': ['text-lg', 'minRes350:text-2xl']
      }
    }
  },
  [ABOUT]: {
    id: ABOUT,
    pageHeader: {
      title: 'about.title',
      bgImage: '/images/crane-icon-white.png',
      description: 'about.description',
      // text1: 'about.text1',
      classNames: {
        'bg': ['bg-amber-400'],
        'title': ['mt-[10vh]', 'md:mt-[1vh]', 'text-5xl', 'text-gray-800', 'font-bold'],
        'description': ['text-lg', 'minRes350:text-2xl', 'text-gray-800'],
        'text1': ['text-right', 'text-sm', 'italic']
      }
    }
  },
  [CONTACT]: {
    id: CONTACT,
    pageHeader: {
      title: 'contact.title',
      bgImage: '/images/crane-icon-white.png',
      // description: 'contact.description',
      classNames: {
        'bg': ['bg-amber-400'],
        'title': ['mt-[10vh]', 'md:mt-[1vh]', 'text-5xl', 'text-gray-800', 'font-bold'],
        'description': ['text-lg', 'minRes350:text-2xl', 'text-gray-800']
      }
    },
  },
  [DETAIL]: {
    id: DETAIL,
    otherDetailsGallery: {
      gallerySettings: {
        itemsToShow: 1.7,
        snapAlign: 'center',
        wrapAround: true,
        breakpoints: {
          450: {
            itemsToShow: 2,
            snapAlign: 'center',
          },
          768: {
            itemsToShow: 3,
            snapAlign: 'center',
          }
        }
      },
      galleryStyle: {
        carouselItem: 'h-[200px] minRes550:h-[300px] minRes550:mt-[-5vh] lg:h-[300px] shadow-xl grid overflow-hidden'
      }
    }
  },
  [COLLECTION_AVAILABLE]: {
    id: COLLECTION_AVAILABLE,
    pageHeader: {
      title: 'available.works.collection.title',
      bgImage: '/images/crane-icon-white.png',
      description: 'available.works.collection.description',
      classNames: {
        'bg': ['bg-[#008ecd]'],
        'title': ['mt-[10vh]', 'md:mt-[1vh]', 'text-5xl', 'text-white', 'font-bold'],
        'description': ['text-lg', 'minRes350:text-2xl', 'text-white']
      }
    },
  },
  [COLLECTION_UNAVAILABLE]: {
    id: COLLECTION_UNAVAILABLE,
    pageHeader: {
      title: 'unavailable.works.collection.title',
      bgImage: '/images/crane-icon-white.png',
      description: 'unavailable.works.collection.description',
      classNames: {
        'bg': ['bg-amber-400'],
        'title': ['mt-[10vh]', 'md:mt-[1vh]', 'text-5xl', 'text-gray-800', 'font-bold'],
        'description': ['text-lg', 'minRes350:text-2xl', 'text-gray-800']
      }
    },
  }
}