import { ReactNode } from 'react'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
