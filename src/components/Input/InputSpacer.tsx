import { ReactNode } from 'react'

const InputSpacer = ({ children, marginSize }: { children: ReactNode; marginSize: number }) => {
  return <div className={`mt-${marginSize}`}>{children}</div>
}

export default InputSpacer
