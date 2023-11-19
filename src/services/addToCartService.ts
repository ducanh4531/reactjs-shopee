import pagePath from 'src/constants/path'
import { Purchases } from 'src/types/Purchases.type'
import { FetchSuccessResponse } from 'src/types/utils.type'
import APIClient from './api-client'

export default new APIClient<FetchSuccessResponse<Purchases>, { product_id: string; buy_count: number }>(
  `${pagePath.purchases}${pagePath.addToCart}`
)
