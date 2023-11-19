import { zodResolver } from '@hookform/resolvers/zod'
import { BaseSyntheticEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from 'src/components/Button'
import { FormError, Input } from 'src/components/Input'
import InputSpacer from 'src/components/Input/InputSpacer'
import pagePath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import useLogin from 'src/hooks/useLogin'
import type { Account as FormErrorType, Account as LoginFormData } from 'src/types/Account.type'
import { FetchErrorResponse } from 'src/types/utils.type'
import { logInSchema } from 'src/utils/schemaRules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

const Login = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    getValues
  } = useForm<LoginFormData>({ resolver: zodResolver(logInSchema) })

  const loginMutation = useLogin()

  const onSubmit = (data: LoginFormData, e: BaseSyntheticEvent<object> | undefined) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        e?.target.reset()
        navigate(pagePath.home)
        setIsAuthenticated(true)
        setProfile(data.data.user)
        toast.success('Login successfully!', { position: 'bottom-right' })
      },
      onError: (error) => {
        const errorForm = isAxiosUnprocessableEntityError<FetchErrorResponse<FormErrorType>>(error)
          ? error.response?.data.data
          : undefined

        if (errorForm) {
          Object.keys(errorForm).forEach((key) =>
            setError(key as keyof FormErrorType, { message: errorForm[key as keyof FormErrorType], type: 'Server' })
          )
        }
      }
    })
  }

  // * use getValues for debugging react-hook-form
  const value = getValues()
  console.log(value, errors)

  return (
    <main className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl capitalize'>login</div>

              <InputSpacer className='mt-8'>
                <Input name='email' type='email' register={register} placeholder='Email' />
                <FormError errorMessage={errors.email?.message} />
              </InputSpacer>

              <InputSpacer className='mt-3'>
                <Input name='password' type='password' register={register} placeholder='Password' autoComplete='on' />
                <FormError errorMessage={errors.password?.message} />
              </InputSpacer>

              <InputSpacer className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  login
                </Button>
              </InputSpacer>

              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>New to Shopee?</span>
                <Link className='ml-1 capitalize text-red-400' to={pagePath.signup}>
                  sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
