import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import purchasesListStatus from 'src/constants/purchases'
import { AppContext } from 'src/contexts/app.context'
import logoutService from 'src/services/logoutService'

const useLogout = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logoutService.post(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesListStatus.bag }] })
    }
  })
}

export default useLogout
