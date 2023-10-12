import { User } from 'src/types/User.type'

// * store access token to local storage
export const setAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

// * get and remove access token, user profile from local storage
export const getAccessToken = () => localStorage.getItem('access_token') || ''

export const removeAccessTokenAndUser = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}

// * store user profile to local storage
export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

// * get user profile from local storage
export const getUser = () => {
  const result = localStorage.getItem('user')
  return result ? JSON.parse(result) : null
}
