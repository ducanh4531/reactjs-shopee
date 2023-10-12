export interface FetchSuccessResponse<T> {
  message: string
  data: T
}

export interface FetchErrorResponse<T> {
  message: string
  data?: T
}
