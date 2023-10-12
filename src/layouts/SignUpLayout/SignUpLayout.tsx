import { ReactNode } from 'react'
import { Footer } from 'src/components/Footer'
import { SignUpHeader } from 'src/components/SignUpHeader'

interface SignUpLayoutProps {
  children?: ReactNode
}

// * This layout used for SignUp and Login components
const SignUpLayout = ({ children }: SignUpLayoutProps) => {
  return (
    <>
      <SignUpHeader />
      {children}
      <Footer />
    </>
  )
}

export default SignUpLayout
