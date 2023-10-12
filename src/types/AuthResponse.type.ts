import { User } from './User.type'
import { FetchSuccessResponse } from './utils.type'

export type AuthResponse = FetchSuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
