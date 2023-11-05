import { omit } from 'lodash'
import { InputHTMLAttributes, forwardRef } from 'react'
import type { UseFormRegister } from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  classNameInput?: string
}

const Input = forwardRef(function Input(
  {
    classNameInput = 'p-3 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm',
    ...rest
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const registerResult = rest.register && rest.name ? rest.register(rest.name) : {}

  return <input ref={ref} className={classNameInput} {...omit(rest, ['register'])} {...registerResult} />
})

export default Input
