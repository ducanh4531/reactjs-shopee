import pagePath from 'src/constants/path'
import { CategoriesResponse } from 'src/types/CategoriesResponse.type'
import APIClient from './api-client'

export default new APIClient<CategoriesResponse, ''>(pagePath.categories)
