import { useQuery } from '@tanstack/react-query'
import productService from 'src/services/productService'
import { ProductsQuery } from './useProductsQuery'

const useProducts = (queryParams: ProductsQuery) => {
  return useQuery({
    queryKey: ['products', queryParams],
    queryFn: () =>
      productService.getAll({
        params: queryParams
      }),
    keepPreviousData: true
  })
}

export default useProducts
