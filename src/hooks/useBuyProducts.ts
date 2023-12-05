import { useMutation } from '@tanstack/react-query'
import buyProductsService from 'src/services/buyProductsService'
import { Purchases } from 'src/types/Purchases.type'
import { FetchSuccessResponse } from 'src/types/utils.type'

const useBuyProducts = () => {
  return useMutation<FetchSuccessResponse<Purchases[]>, Error, { product_id: string; buy_count: number }[]>({
    mutationFn: (body) => buyProductsService.post(body),
    onSuccess: () => {}
  })
}

export default useBuyProducts
