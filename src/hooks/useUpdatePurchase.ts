import { useMutation } from '@tanstack/react-query'
import updatePurchaseService from 'src/services/updatePurchaseService'
import { Purchases } from 'src/types/Purchases.type'
import { FetchSuccessResponse } from 'src/types/utils.type'

const useUpdatePurchase = () => {
  return useMutation<FetchSuccessResponse<Purchases>, Error, { product_id: string; buy_count: number }>({
    mutationFn: (body) => updatePurchaseService.put(body)
  })
}

export default useUpdatePurchase
