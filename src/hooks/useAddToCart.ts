import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import purchasesListStatus from 'src/constants/purchases'
import addToCartService from 'src/services/addToCartService'
import { Purchases } from 'src/types/Purchases.type'
import { FetchSuccessResponse } from 'src/types/utils.type'

const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation<FetchSuccessResponse<Purchases>, Error, { product_id: string; buy_count: number }>({
    mutationFn: (body) => addToCartService.post(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesListStatus.bag }] })
      toast.success('Added to cart', { position: 'bottom-right', autoClose: 1000 })
    }
  })
}

export default useAddToCart
