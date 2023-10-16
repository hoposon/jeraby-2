import { CollectionWork, CollectionWorkEnhanced } from '../types/index'
import collections from './collections.config.js'

import jeraby from './jeraby-works.js'

const worksPriorities: {[key: string]: number} = {
  'jeraby-28': 1,
  'jeraby-29': 3,
  'jeraby-26': 2,
  'jeraby-27': 4,
  'jeraby-25': 5,
  'jeraby-23': 6,
  'jeraby-20': 7,
  'jeraby-16': 8,
  'jeraby-15': 9,
  'jeraby-7': 10,
  'jeraby-6': 11,
  'jeraby-18': 12,
  'jeraby-17': 13,
  'jeraby-14': 14,

  'jeraby-1': 11,
  'jeraby-2': 21,
  'jeraby-3': 31,
  'jeraby-4': 41,
  'jeraby-5': 51,
  'jeraby-8': 81,
  'jeraby-9': 91,
  'jeraby-10': 101,
  'jeraby-11': 111,
  'jeraby-12': 121,
  'jeraby-13': 131,
}

const worksPublished: {[key: string]: boolean} = {
  'jeraby-28': true,
  'jeraby-29': true,
  'jeraby-26': true,
  'jeraby-27': true,
  'jeraby-25': true,
  'jeraby-23': true,
  'jeraby-20': true,
  'jeraby-16': true,
  'jeraby-15': true,
  'jeraby-7': true,
  'jeraby-6': true,
  'jeraby-18': true,
  'jeraby-17': true,
  'jeraby-14': true,

  'jeraby-1': false,
  'jeraby-2': false,
  'jeraby-3': false,
  'jeraby-4': false,
  'jeraby-5': false,
  'jeraby-8': false,
  'jeraby-9': false,
  'jeraby-10': false,
  'jeraby-11': false,
  'jeraby-12': false,
  'jeraby-13': false,
}

const worksState: {[key: string]: 'available'|'unavailable'} = {
  'jeraby-28': 'available',
  'jeraby-29': 'available',
  'jeraby-26': 'available',
  'jeraby-27': 'available',
  'jeraby-25': 'available',
  'jeraby-23': 'available',
  'jeraby-20': 'available',
  'jeraby-16': 'available',
  'jeraby-15': 'unavailable',
  'jeraby-7': 'unavailable',
  'jeraby-6': 'unavailable',
  'jeraby-18': 'available',
  'jeraby-17': 'available',
  'jeraby-14': 'available',

  'jeraby-1': 'available',
  'jeraby-2': 'available',
  'jeraby-3': 'available',
  'jeraby-4': 'available',
  'jeraby-5': 'available',
  'jeraby-8': 'available',
  'jeraby-9': 'available',
  'jeraby-10': 'unavailable',
  'jeraby-11': 'unavailable',
  'jeraby-12': 'unavailable',
  'jeraby-13': 'unavailable',
}

const worksAtHomePage: {[key: string]: boolean} = {
  'jeraby-28': true,
  'jeraby-29': true,
  'jeraby-26': true,
  'jeraby-27': true,
  'jeraby-25': false,
  'jeraby-23': true,
  'jeraby-20': false,
  'jeraby-16': false,
  'jeraby-15': true,
  'jeraby-7': false,
  'jeraby-6': false,
  'jeraby-18': false,
  'jeraby-17': false,
  'jeraby-14': true,

  'jeraby-1': true,
  'jeraby-2': false,
  'jeraby-3': false,
  'jeraby-4': true,
  'jeraby-5': false,
  'jeraby-8': true,
  'jeraby-9': false,
  'jeraby-10': true,
  'jeraby-11': true,
  'jeraby-12': false,
  'jeraby-13': true,
}

const worksInCollections: {[key: string]: string[]} = {
  'jeraby-28': ['jeraby-collection'],
  'jeraby-29': ['jeraby-collection'],
  'jeraby-26': ['jeraby-collection'],
  'jeraby-27': ['jeraby-collection'],
  'jeraby-25': ['jeraby-collection'],
  'jeraby-23': ['jeraby-collection'],
  'jeraby-20': ['jeraby-collection'],
  'jeraby-16': ['jeraby-collection'],
  'jeraby-15': ['jeraby-collection'],
  'jeraby-7': ['jeraby-collection'],
  'jeraby-6': ['jeraby-collection'],
  'jeraby-18': ['jeraby-collection'],
  'jeraby-17': ['jeraby-collection'],
  'jeraby-14': ['jeraby-collection'],

  'jeraby-1': ['jeraby-collection'],
  'jeraby-2': ['jeraby-collection'],
  'jeraby-3': ['jeraby-collection'],
  'jeraby-4': ['jeraby-collection'],
  'jeraby-5': ['jeraby-collection'],
  'jeraby-8': ['jeraby-collection'],
  'jeraby-9': ['jeraby-collection'],
  'jeraby-10': ['jeraby-collection'],
  'jeraby-11': ['jeraby-collection'],
  'jeraby-12': ['jeraby-collection'],
  'jeraby-13': ['jeraby-collection'],
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

