import React, { InputHTMLAttributes, forwardRef } from 'react'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
}

const InputNumber = forwardRef(function InputNumber(
  {
    classNameInput = 'p-3 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm',
    onChange,
    ...rest
  }: InputNumberProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return <input ref={ref} onChange={handleChange} className={classNameInput} {...rest} />
})

export default InputNumber
