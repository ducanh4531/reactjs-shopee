import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { FormError, InputSpacer } from 'src/components/Input'
import { InputNumber } from 'src/components/InputNumber'
import pagePath from 'src/constants/path'
import useCategories from 'src/hooks/useCategories'
import { priceRangeSchema } from 'src/utils/schemaRules'
import z from 'zod'
import { ProductsQuery } from '../..'
import { RatingStars } from './RatingStars'

type FormData = z.infer<typeof priceRangeSchema>

interface AsideFilterProps {
  productsQuery: ProductsQuery
}

const AsideFilter = ({ productsQuery }: AsideFilterProps) => {
  const navigate = useNavigate()
  const { data } = useCategories()
  const { category } = productsQuery
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { price_min: '', price_max: '' },
    resolver: zodResolver(priceRangeSchema),
    shouldFocusError: false
  })

  const isActiveCategory = (categoryId: string) => {
    return category === categoryId
  }

  const onSubmit = handleSubmit(
    (data: FormData) => {
      const keysForDel = []

      const params = createSearchParams({
        ...productsQuery,
        price_min: data.price_min || '',
        price_max: data.price_max || ''
      })

      // remove keys if values are empty (price_min or price_max)
      for (const [key, value] of params) {
        if (value === '') keysForDel.push(key)
      }

      keysForDel.forEach((key) => params.delete(key))

      navigate({
        pathname: pagePath.home,
        search: params.toString()
      })
    },
    (err) => {
      // err.price_max?.ref?.focus && err.price_max?.ref?.focus()
      // * OR
      err.price_max?.ref?.focus?.()
    }
  )

  const handleResetFilter = () => {
    navigate({
      pathname: pagePath.home,
      search: createSearchParams(
        omit(productsQuery, ['category', 'price_min', 'price_max', 'rating_filter'])
      ).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={pagePath.home}
        className={classNames('flex items-center font-bold capitalize', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        all categories
      </Link>

      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {data &&
          data.data.map((category) => (
            <li key={category._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: pagePath.home,
                  search: createSearchParams({
                    ...productsQuery,
                    category: category._id
                  }).toString()
                }}
                className={classNames('relative px-2 capitalize', {
                  'text-orange font-semibold': isActiveCategory(category._id),
                  'font-normal': !isActiveCategory(category._id)
                })}
              >
                {isActiveCategory(category._id) && (
                  <svg viewBox='0 0 4 7' className='w-2 h-2  absolute top-1.5 left-[-10px] fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {category.name}
              </Link>
            </li>
          ))}
      </ul>

      <Link to={pagePath.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 mr-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        search filter
      </Link>

      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5 capitalize'>
        <div>price range</div>
        <form className='mt-2' onSubmit={onSubmit} noValidate>
          <div className='flex items-center'>
            <InputSpacer className='grow'>
              <Controller
                name='price_min'
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    onChange={async (event) => {
                      field.onChange(event)
                      await trigger('price_max')
                    }}
                    type='text'
                    classNameInput='p-1 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
                    placeholder='₫ MIN'
                  />
                )}
              />
            </InputSpacer>
            <div className='bg-gray-300 mx-2.5 h-[1px] shrink grow w-4' />
            <InputSpacer className='grow'>
              <Controller
                name='price_max'
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    onChange={async (event) => {
                      field.onChange(event)
                      await trigger('price_max')
                    }}
                    type='text'
                    classNameInput='p-1 w-full rounded-sm outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm'
                    placeholder='₫ MAX'
                  />
                )}
              />
            </InputSpacer>
          </div>
          <FormError errorMessage={errors.price_max?.message} />
          <InputSpacer className='pt-3 flex justify-center items-center'>
            <Button type='submit' className='w-full p-2 uppercase bg-orange hover:bg-orange/80 text-sm text-white'>
              apply
            </Button>
          </InputSpacer>
        </form>
      </div>

      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='capitalize'>
        <div>rating</div>
        <RatingStars productsQuery={productsQuery} />
      </div>

      <div className='bg-gray-300 h-[1px] my-4' />
      <InputSpacer className='pt-3 flex justify-center items-center'>
        <Button
          type='button'
          onClick={handleResetFilter}
          className='w-full p-2 uppercase bg-orange hover:bg-orange/80 text-sm text-white'
        >
          clear all
        </Button>
      </InputSpacer>
    </div>
  )
}

export default AsideFilter
