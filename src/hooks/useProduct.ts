import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productDetailService from 'src/services/productDetailService'

const useProduct = () => {
  const { id: productId } = useParams()

  return useQuery({
    queryKey: productId ? ['product', productId] : ['product'],
    queryFn: () => productDetailService.get(productId)
  })
}

export default useProduct
