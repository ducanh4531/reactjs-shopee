import { useState } from 'react'
import { Button } from '../Button'
import { InputNumber, InputNumberProps } from '../InputNumber'

interface QuantityControllerProps extends InputNumberProps {
  max?: number
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
  onTyping?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

const QuantityController = ({
  max,
  onDecrease,
  onIncrease,
  onTyping,
  onFocusOut,
  classNameWrapper = 'ml-8',
  value,
  ...rest
}: QuantityControllerProps) => {
  const [localValue, setLocalValue] = useState<number>(Number(value || 1))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)

    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 0) {
      _value = 1
    }

    onTyping && onTyping(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1

    if (max !== undefined && _value >= max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1

    if (_value < 1) {
      _value = 1
    }

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }

  return (
    <>
      <div className={`flex items-center ${classNameWrapper}`}>
        <Button
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
          onClick={decrease}
        >
          <svg enableBackground='new 0 0 10 10' viewBox='0 0 10 10' x={0} y={0} className='h-3 w-3'>
            <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5' />
          </svg>
        </Button>
        <InputNumber
          onChange={handleChange}
          value={value || localValue}
          onBlur={handleBlur}
          classNameInput='h-8 w-14 outline-none border border-gray-300 p-1 text-center'
          {...rest}
        />
        <Button
          className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
          onClick={increase}
        >
          <svg enableBackground='new 0 0 10 10' viewBox='0 0 10 10' x={0} y={0} className='h-3 w-3'>
            <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5' />
          </svg>
        </Button>
      </div>
    </>
  )
}

export default QuantityController
