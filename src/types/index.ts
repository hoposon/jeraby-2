export interface PageHeader {
  title: string,
  subtitle?: string,
  description?: string,
  bgImage?: string,
  classNames?: {
    [key: string]: string|string[]
  }
}

export interface GridItem {
  id: string,
  type: 'TEXT'|'IMAGE',
  title?: string,
  description?: {
    size?: string,
    text?: string
  },
  image?: {
    imgPath: string,
    imgAlt: string,
  }
}

export interface Collection {
  id: string,
  pageHeader: PageHeader,
  title: string,
  description?: string,
  collectionPriority: number,
  published: boolean,
  classNames?: {
    header?: {
      [key: string]: string
    }
  }, 
}

export interface CollectionWork {
  id: string,
  pageHeader: PageHeader,
  title: string,
  presentation: {
    presentationDescription: string,
    presentationImages: {imgPath: string, imgAlt: string}[],
    presentationType: 'oneLeft'|'oneRight'|'twoImages',
    classNames: {
      [key: string]: string
    },
  },
  workDetails: {
    gridItems: GridItem[]
  }
}

export interface CollectionWorkEnhanced extends CollectionWork {
  priority: number,
  published: boolean,
  workState: 'unavailable'|'available',
  workAtHomePage: boolean,
  collections: Collection[]
}