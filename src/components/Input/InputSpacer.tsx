import { ReactNode } from 'react'

interface InputSpacerProps {
  children: ReactNode
  className: string
}

const InputSpacer = ({ children, className }: InputSpacerProps) => {
  return <div className={className}>{children}</div>
}

export default InputSpacer
