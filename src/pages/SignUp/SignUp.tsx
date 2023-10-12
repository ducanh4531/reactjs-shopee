import { zodResolver } from '@hookform/resolvers/zod'
import { omit } from 'lodash'
import { BaseSyntheticEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { FormError, Input } from 'src/components/Input'
import InputSpacer from 'src/components/Input/InputSpacer'
import pagePath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import useSignUp from 'src/hooks/useSignUp'
import type { Account as FormErrorType, FormData as SignUpFormData } from 'src/types/Account.type'
import { FetchErrorResponse } from 'src/types/utils.type'
import { signUpSchema } from 'src/utils/schemaRules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

const SignUp = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) })

  const signUpMutation = useSignUp()

  const onSubmit = (data: SignUpFormData, e: BaseSyntheticEvent<object> | undefined) => {
    const body = omit(data, ['confirm_password'])
    signUpMutation.mutate(body, {
      onSuccess: (data) => {
        e?.target.reset()
        setIsAuthenticated(true)
        setProfile(data.data.user)
        navigate(pagePath.home)
      },
      onError: (error) => {
        const errorForm = isAxiosUnprocessableEntityError<FetchErrorResponse<FormErrorType>>(error)
          ? error.response?.data.data
          : undefined

        // * Way 1: if there are too many keys
        if (errorForm) {
          Object.keys(errorForm).forEach((key) =>
            setError(key as keyof FormErrorType, { message: errorForm[key as keyof FormErrorType], type: 'Server' })
          )
        }

        // * Way 2: handle a few keys
        // if (errorForm?.email) {
        //   setError('email', { message: errorForm.email, type: 'Server' })
        // }

        // if (errorForm?.password) {
        //   setError('password', { message: errorForm.password, type: 'Server' })
        // }
      }
    })
  }

  return (
    <main className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl capitalize'>sign up</div>
              <InputSpacer marginSize={8}>
                <Input id='email' type='email' placeholder='Email' register={register} />
                <FormError errorMessage={errors.email?.message} />
              </InputSpacer>

              <InputSpacer marginSize={2}>
                <Input id='password' type='password' placeholder='Password' autoComplete='on' register={register} />
                <FormError errorMessage={errors.password?.message} />
              </InputSpacer>

              <InputSpacer marginSize={2}>
                <Input
                  id='confirm_password'
                  type='password'
                  placeholder='Confirm Password'
                  autoComplete='on'
                  register={register}
                />
                {<FormError errorMessage={errors.confirm_password?.message} />}
              </InputSpacer>

              <InputSpacer marginSize={2}>
                <Button
                  type='submit'
                  className='flex justify-center items-center w-full text-center py-4 px-2 bg-red-500 text-white text-sm hover:bg-red-600 uppercase'
                  isLoading={signUpMutation.isLoading}
                  disabled={signUpMutation.isLoading}
                >
                  sign up
                </Button>
              </InputSpacer>

              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Have an account?</span>
                <Link className='text-red-400 ml-1 capitalize' to={pagePath.login}>
                  login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp
