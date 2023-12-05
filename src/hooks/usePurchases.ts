import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import purchasesListStatus from 'src/constants/purchases'
import { AppContext } from 'src/contexts/app.context'
import purchasesService from 'src/services/purchasesService'

const usePurchases = () => {
  const { isAuthenticated } = useContext(AppContext)

  return useQuery({
    queryKey: ['purchases', { status: purchasesListStatus.bag }],
    queryFn: () =>
      purchasesService.getAll({
        params: { status: purchasesListStatus.bag }
      }),
    enabled: isAuthenticated
  })
}

export default usePurchases
