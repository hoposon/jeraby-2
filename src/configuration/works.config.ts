import { CollectionWork, CollectionWorkEnhanced } from '../types/index'
import collections from './collections.config.js'

import jeraby from './jeraby-works.js'

const worksPriorities: {[key: string]: number} = {
  'jeraby-28': 1,
  'jeraby-29': 2,
  'jeraby-1': 11,
  'jeraby-2': 21,
  'jeraby-3': 31,
  'jeraby-4': 41,
  'jeraby-5': 51,
  'jeraby-6': 61,
  'jeraby-7': 71,
  'jeraby-8': 81,
  'jeraby-9': 91,
  'jeraby-10': 101,
  'jeraby-11': 111,
  'jeraby-12': 121,
  'jeraby-13': 131,
  'jeraby-14': 141,
  'jeraby-15': 151,
  'jeraby-16': 161,
  'jeraby-17': 171,
  'jeraby-18': 181,
}

const worksPublished: {[key: string]: boolean} = {
  'jeraby-28': true,
  'jeraby-29': true,
  'jeraby-1': false,
  'jeraby-2': false,
  'jeraby-3': false,
  'jeraby-4': false,
  'jeraby-5': false,
  'jeraby-6': false,
  'jeraby-7': false,
  'jeraby-8': false,
  'jeraby-9': false,
  'jeraby-10': false,
  'jeraby-11': false,
  'jeraby-12': false,
  'jeraby-13': false,
  'jeraby-14': false,
  'jeraby-15': false,
  'jeraby-16': false,
  'jeraby-17': false,
  'jeraby-18': false,
}

const worksState: {[key: string]: 'available'|'unavailable'} = {
  'jeraby-28': 'available',
  'jeraby-29': 'available',
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
  'jeraby-28': true,
  'jeraby-29': true,
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
  'jeraby-28': ['jeraby-collection'],
  'jeraby-29': ['jeraby-collection'],
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

