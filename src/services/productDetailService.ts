import pagePath from 'src/constants/path'
import { Product } from 'src/types/Product.type'
import { ProductDetailResponse } from 'src/types/ProductResponse.type'
import APIClient from './api-client'

export default new APIClient<ProductDetailResponse, Product>(pagePath.products)
