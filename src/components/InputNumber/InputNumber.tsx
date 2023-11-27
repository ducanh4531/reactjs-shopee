import React, { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
}

const InputNumber = forwardRef(function InputNumber(
  {
    classNameInput = 'p-3 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm',
    onChange,
    value = '',
    ...rest
  }: InputNumberProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(event)
      setLocalValue(value)
    }
  }

  return <input ref={ref} onChange={handleChange} value={value || localValue} className={classNameInput} {...rest} />
})

export default InputNumber
