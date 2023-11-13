import { isUndefined, omitBy } from 'lodash'
import { ProductsConfig } from 'src/types/Product.type'
import useQueryParams from './useQueryParams'

export type ProductsQuery = {
  [key in keyof ProductsConfig]: string
}

const useProductsQuery = () => {
  const queryParams = useQueryParams()
  const productsQuery: ProductsQuery = omitBy(
    {
      page: queryParams.page && queryParams.page > 0 ? queryParams.page : '1',
      limit: queryParams.limit,
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      category: queryParams.category,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  return productsQuery
}

export default useProductsQuery
