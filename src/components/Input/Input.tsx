import type { UseFormRegister } from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputProps {
  id: string
  register: UseFormRegister<any>
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
}

const Input = ({ ...rest }: InputProps) => {
  return (
    <input
      type={rest.type}
      placeholder={rest.placeholder}
      autoComplete={rest.autoComplete}
      className='p-3 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
      {...rest.register(rest.id)}
    />
  )
}

export default Input
