import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import logoutService from 'src/services/logoutService'

const useLogout = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  return useMutation({
    mutationFn: () => logoutService.post(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })
}

export default useLogout
