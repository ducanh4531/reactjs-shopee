import { useMutation } from '@tanstack/react-query'
import loginService from 'src/services/loginService'
import { Account } from 'src/types/Account.type'
import { AuthResponse } from 'src/types/AuthResponse.type'

const useLogin = () => {
  return useMutation<AuthResponse, Error, Account>({
    mutationFn: (body) => loginService.post(body)
  })
}

export default useLogin
