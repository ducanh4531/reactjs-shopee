import { useQuery } from '@tanstack/react-query'
import { ProductsQuery } from 'src/pages/ProductList'
import productService from 'src/services/productService'

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
