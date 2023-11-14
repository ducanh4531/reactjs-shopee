import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import productService from 'src/services/productService'
import { ProductsQuery } from './useProductsQuery'

const useProducts = (queryParams: ProductsQuery) => {
  return useQuery({
    queryKey: ['products', queryParams],
    queryFn: () =>
      productService.getAll({
        params: queryParams
      }),
    keepPreviousData: true,
    staleTime: ms('2h'),
    enabled: Boolean(Object.keys(queryParams).length)
  })
}

export default useProducts
