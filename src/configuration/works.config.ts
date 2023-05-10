import { CollectionWork, CollectionWorkEnhanced } from '../types/index'
import collections from './collections.config.js'

import jeraby from './jeraby-works.js'

const worksPriorities: {[key: string]: number} = {
  'jeraby-1': 1,
  'jeraby-2': 2,
  'jeraby-3': 3,
  'jeraby-4': 4,
  'jeraby-5': 5,
  'jeraby-6': 6,
  'jeraby-7': 7,
  'jeraby-8': 8,
  'jeraby-9': 9,
  'jeraby-10': 10,
  'jeraby-11': 11,
  'jeraby-12': 12,
  'jeraby-13': 13,
  'jeraby-14': 14,
  'jeraby-15': 15,
  'jeraby-16': 16,
  'jeraby-17': 17,
  'jeraby-18': 18,
}

const worksPublished: {[key: string]: boolean} = {
  'jeraby-1': true,
  'jeraby-2': true,
  'jeraby-3': true,
  'jeraby-4': true,
  'jeraby-5': true,
  'jeraby-6': true,
  'jeraby-7': true,
  'jeraby-8': true,
  'jeraby-9': true,
  'jeraby-10': true,
  'jeraby-11': true,
  'jeraby-12': true,
  'jeraby-13': true,
  'jeraby-14': true,
  'jeraby-15': true,
  'jeraby-16': true,
  'jeraby-17': true,
  'jeraby-18': true,
}

const worksState: {[key: string]: 'available'|'unavailable'} = {
  'jeraby-1': 'available',
  'jeraby-2': 'available',
  'jeraby-3': 'available',
  'jeraby-4': 'available',
  'jeraby-5': 'available',
  'jeraby-6': 'available',
  'jeraby-7': 'available',
  'jeraby-8': 'available',
  'jeraby-9': 'available',
  'jeraby-10': 'unavailable',
  'jeraby-11': 'unavailable',
  'jeraby-12': 'unavailable',
  'jeraby-13': 'unavailable',
  'jeraby-14': 'unavailable',
  'jeraby-15': 'unavailable',
  'jeraby-16': 'unavailable',
  'jeraby-17': 'unavailable',
  'jeraby-18': 'unavailable',
}

const worksAtHomePage: {[key: string]: boolean} = {
  'jeraby-1': true,
  'jeraby-2': false,
  'jeraby-3': false,
  'jeraby-4': true,
  'jeraby-5': false,
  'jeraby-6': true,
  'jeraby-7': false,
  'jeraby-8': true,
  'jeraby-9': false,
  'jeraby-10': true,
  'jeraby-11': true,
  'jeraby-12': false,
  'jeraby-13': true,
  'jeraby-14': false,
  'jeraby-15': false,
  'jeraby-16': false,
  'jeraby-17': false,
  'jeraby-18': false,
}

const worksInCollections: {[key: string]: string[]} = {
  'jeraby-1': ['jeraby-collection'],
  'jeraby-2': ['jeraby-collection'],
  'jeraby-3': ['jeraby-collection'],
  'jeraby-4': ['jeraby-collection'],
  'jeraby-5': ['jeraby-collection'],
  'jeraby-6': ['jeraby-collection'],
  'jeraby-7': ['jeraby-collection'],
  'jeraby-8': ['jeraby-collection'],
  'jeraby-9': ['jeraby-collection'],
  'jeraby-10': ['jeraby-collection'],
  'jeraby-11': ['jeraby-collection'],
  'jeraby-12': ['jeraby-collection'],
  'jeraby-13': ['jeraby-collection'],
  'jeraby-14': ['jeraby-collection'],
  'jeraby-15': ['jeraby-collection'],
  'jeraby-16': ['jeraby-collection'],
  'jeraby-17': ['jeraby-collection'],
  'jeraby-18': ['jeraby-collection'],
}

const allWorksArr: CollectionWork[] = [
  ...jeraby
]

export const works = (): CollectionWorkEnhanced[] => {
  return allWorksArr.map(work => {
    return {
      ...work,
      priority: worksPriorities[work.id],
      published: worksPublished[work.id],
      workState: worksState[work.id],
      workAtHomePage: worksAtHomePage[work.id],
      collections: worksInCollections[work.id].map(collection => collections[collection])
    }
  })
}

