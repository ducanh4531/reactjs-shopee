export interface FetchSuccessResponse<T> {
  message: string
  data: T
}

export interface FetchErrorResponse<T> {
  message: string
  data?: T
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
