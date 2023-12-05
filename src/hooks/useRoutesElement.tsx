import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import pagePath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { MainLayout } from 'src/layouts/MainLayout'
import { SignUpLayout } from 'src/layouts/SignUpLayout'
import { Cart } from 'src/pages/Cart'
import { Login } from 'src/pages/Login'
import { ProductDetail } from 'src/pages/ProductDetail'
import { ProductList } from 'src/pages/ProductList'
import { Profile } from 'src/pages/Profile'
import { SignUp } from 'src/pages/SignUp'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={pagePath.login} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={pagePath.home} />
}

const useRoutesElement = () => {
  const element = useRoutes([
    {
      path: pagePath.home,
      // * use index property to tell the router to match and
      // * render this route when the user is at the parent route's exact path
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: pagePath.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: pagePath.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: pagePath.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: pagePath.login,
          element: (
            <SignUpLayout>
              <Login />
            </SignUpLayout>
          )
        },
        {
          path: pagePath.signup,
          element: (
            <SignUpLayout>
              <SignUp />
            </SignUpLayout>
          )
        }
      ]
    }
  ])

  return element
}

export default useRoutesElement
