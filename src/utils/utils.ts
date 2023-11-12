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

export function getSaleRate(originalPrice: number, discountPrice: number) {
  return Math.round(((originalPrice - discountPrice) * 100) / originalPrice)
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export function generateNameId({ name, id }: { name: string; id: string }) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}

export function getIdFromNameId(nameId?: string) {
  const arr = nameId ? nameId.split('-i,') : []

  return arr[arr.length - 1]
}
