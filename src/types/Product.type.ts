import { orderBy, sortBy } from 'src/constants/product'

export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface Products {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductsConfig {
  page?: number
  limit?: number
  order?: keyof typeof orderBy
  sort_by?: keyof typeof sortBy
  exclude?: string
  category?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
