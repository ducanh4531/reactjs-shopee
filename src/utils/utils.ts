import { AxiosError, isAxiosError as checkAxiosError } from 'axios'
import { HttpStatusCode } from 'src/constants/HttpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return checkAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatToLocalizedValue(value: number) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

export function formatToCompactValue(value: number) {
  return Intl.NumberFormat('en-US', { notation: 'compact' }).format(value).replace('.', ',').toLowerCase()
}
