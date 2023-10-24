import pagePath from 'src/constants/path'
import { Product } from 'src/types/Product.type'
import { ProductResponse } from 'src/types/ProductResponse.type'
import APIClient from './api-client'

export default new APIClient<ProductResponse, Product>(pagePath.products)
