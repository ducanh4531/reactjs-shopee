import { useMutation } from '@tanstack/react-query'
import signUpService from 'src/services/signUpService'
import { Account } from 'src/types/Account.type'
import { AuthResponse } from 'src/types/AuthResponse.type'

const useSignUp = () => {
  return useMutation<AuthResponse, Error, Account>({ mutationFn: (body) => signUpService.post(body) })
}

export default useSignUp
