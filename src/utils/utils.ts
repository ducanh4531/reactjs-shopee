import { AxiosError, isAxiosError as checkAxiosError } from 'axios'
import { HttpStatusCode } from 'src/types/HttpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return checkAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
