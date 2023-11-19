import { useQuery } from '@tanstack/react-query'
import purchasesListStatus from 'src/constants/purchases'
import purchasesService from 'src/services/purchasesService'

const usePurchases = () => {
  return useQuery({
    queryKey: ['purchases', { status: purchasesListStatus.bag }],
    queryFn: () =>
      purchasesService.getAll({
        params: { status: purchasesListStatus.bag }
      })
  })
}

export default usePurchases
