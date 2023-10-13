import { InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  classNameInput?: string
}

const Input = ({
  classNameInput = 'p-3 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm',
  ...rest
}: InputProps) => {
  const registerResult = rest.register && rest.name ? rest.register(rest.name) : {}

  return (
    <input
      type={rest.type}
      placeholder={rest.placeholder}
      autoComplete={rest.autoComplete}
      className={classNameInput}
      {...registerResult}
    />
  )
}

export default Input
