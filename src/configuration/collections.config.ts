import { Collection } from '../types/index'

const collections: {[key: string]: Collection} = {
  'jeraby-collection': {
    id: 'jeraby-collection',
    pageHeader: {
      title: 'jeraby.collection.title',
      bgImage: '/images/crane-icon-white.png',
      classNames: {
        'bg': ['bg-red-400'],
        'title': ['mt-[10vh] md:mt-[1vh]', 'text-6xl', 'text-gray-800', 'font-semi-bold'],
      }
    },
    title: 'jeraby.collection.title',
    description: 'jeraby.collection.description',
    collectionPriority: 1,
    published: true,
    classNames: {
    },
  }
}

export default collections