import { Product } from './Product.type'

type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchasesListStatus = PurchasesStatus | 0

export type Purchases = {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchasesStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
