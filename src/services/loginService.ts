import pagePath from 'src/constants/path'
import { Account } from 'src/types/Account.type'
import { AuthResponse } from 'src/types/AuthResponse.type'
import APIClient from './api-client'

export default new APIClient<AuthResponse, Account>(pagePath.login)
