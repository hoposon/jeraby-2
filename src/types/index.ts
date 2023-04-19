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
  id: string
  type: 'IMG' | 'TEXT'
  title?: string
  description?: {
    [key: string]: string
  }
  image?: {
    src: string
    alt: string
  }
}