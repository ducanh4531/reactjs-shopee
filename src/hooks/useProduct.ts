import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productDetailService from 'src/services/productDetailService'
import { getIdFromNameId } from 'src/utils/utils'

const useProduct = () => {
  const { nameId } = useParams()

  const productId = getIdFromNameId(nameId)

  return useQuery({
    queryKey: productId ? ['product', productId] : ['product'],
    queryFn: () => productDetailService.get(productId)
  })
}

export default useProduct
