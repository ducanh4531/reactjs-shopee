import { ReactNode, createContext, useState } from 'react'
import { User } from 'src/types/User.type'
import { getAccessToken, getUser } from 'src/utils/auth'

interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

interface AppProviderProps {
  children: ReactNode
}

const initialAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  profile: getUser(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextType>(initialAppContext)

const AppProvider = ({ children }: AppProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  return (
    <>
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
        {children}
      </AppContext.Provider>
    </>
  )
}

export default AppProvider
