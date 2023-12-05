import pagePath from 'src/constants/path'
import { FetchSuccessResponse } from 'src/types/utils.type'
import APIClient from './api-client'

export default new APIClient<FetchSuccessResponse<{ deleted_count: number }>, { delete_id: number }[]>(
  `${pagePath.purchases}`
)
