import { Product, Products } from './Product.type'
import { FetchSuccessResponse } from './utils.type'

export type ProductResponse = FetchSuccessResponse<Products>

export type ProductDetailResponse = FetchSuccessResponse<Product>
