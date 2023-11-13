import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { InputSpacer } from 'src/components/Input'
import { Popover } from 'src/components/Popover'
import pagePath from 'src/constants/path'
import { orderBy, sortBy } from 'src/constants/product'
import { ProductsQuery } from 'src/hooks/useProductsQuery'
import { ProductsConfig } from 'src/types/Product.type'

interface SortProductListProps {
  pageSize: number
  productsQuery: ProductsQuery
}

const SortProductList = ({ pageSize, productsQuery }: SortProductListProps) => {
  const navigate = useNavigate()
  const { sort_by = sortBy.createdAt, order } = productsQuery
  const currentPage = Number(productsQuery.page)

  const isActiveSortBy = (
    sortByValue: Exclude<ProductsConfig['sort_by'], undefined>,
    orderValue?: ProductsConfig['order']
  ) => {
    if (orderValue) {
      return sort_by === sortByValue && order === orderValue
    }

    return sort_by === sortByValue
  }

  const handleSort =
    (sortByValue: Exclude<ProductsConfig['sort_by'], undefined>, orderValue?: ProductsConfig['order']) => () => {
      const keysForDel = []

      const params = createSearchParams({
        ...productsQuery,
        sort_by: sortByValue,
        order: orderValue || ''
      })

      // remove keys if values are empty (order key)
      for (const [key, value] of params) {
        if (value === '') keysForDel.push(key)
      }

      keysForDel.forEach((key) => params.delete(key))

      navigate({
        pathname: pagePath.home,
        search: params.toString()
      })
    }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-4'>
          <div>Sort by</div>
          <InputSpacer className='flex items-center justify-center'>
            <Button
              type='submit'
              onClick={handleSort(sortBy.view)}
              className={classNames('rounded-sm px-4 py-2 text-sm capitalize', {
                'bg-orange text-white': isActiveSortBy(sortBy.view),
                'bg-white': !isActiveSortBy(sortBy.view)
              })}
            >
              popular
            </Button>
          </InputSpacer>
          <InputSpacer className='flex items-center justify-center'>
            <Button
              type='submit'
              onClick={handleSort(sortBy.createdAt)}
              className={classNames('rounded-sm px-4 py-2 text-sm capitalize', {
                'bg-orange text-white': isActiveSortBy(sortBy.createdAt),
                'bg-white': !isActiveSortBy(sortBy.createdAt)
              })}
            >
              latest
            </Button>
          </InputSpacer>
          <InputSpacer className='flex items-center justify-center'>
            <Button
              type='submit'
              onClick={handleSort(sortBy.sold)}
              className={classNames('rounded-sm px-4 py-2 text-sm capitalize', {
                'bg-orange text-white': isActiveSortBy(sortBy.sold),
                'bg-white': !isActiveSortBy(sortBy.sold)
              })}
            >
              top sales
            </Button>
          </InputSpacer>
          <InputSpacer className='flex cursor-pointer items-center justify-normal rounded-sm bg-white'>
            <Popover
              className='flex w-40 items-center justify-between px-2.5 py-2'
              renderPopover={
                <div className='relative rounded-sm bg-white text-sm shadow-md'>
                  <div className='flex w-40 flex-col'>
                    <button
                      className={classNames('p-2.5 text-left hover:text-orange', {
                        'text-orange': isActiveSortBy(sortBy.price, orderBy.asc)
                      })}
                      onClick={handleSort(sortBy.price, orderBy.asc)}
                    >
                      <span>Price: Low to High</span>
                    </button>
                    <button
                      className={classNames('p-2.5 text-left hover:text-orange', {
                        'text-orange': isActiveSortBy(sortBy.price, orderBy.desc)
                      })}
                      onClick={handleSort(sortBy.price, orderBy.desc)}
                    >
                      <span>Price: High to Low</span>
                    </button>
                  </div>
                </div>
              }
            >
              <span className={classNames('text-sm capitalize', { 'text-orange': order })}>
                {order === orderBy.asc ? 'Price: Low to High' : order === orderBy.desc ? 'Price: High to Low' : 'price'}
              </span>
              <svg viewBox='0 0 10 6' className='h-3 w-3'>
                <path
                  d='M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z'
                  fillRule='nonzero'
                />
              </svg>
            </Popover>
          </InputSpacer>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{currentPage}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex justify-between'>
            <InputSpacer className='flex items-center justify-center'>
              {currentPage <= 1 ? (
                <span className='cursor-not-allowed rounded-bl-sm rounded-tl-sm border border-slate-300 bg-white/60 p-2 shadow-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: pagePath.home,
                    search: createSearchParams({
                      ...productsQuery,
                      page: (currentPage - 1).toString()
                    }).toString()
                  }}
                  className='rounded-br-sm rounded-tr-sm border border-slate-300 bg-gray-300/40 p-2 shadow-sm hover:bg-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </Link>
              )}
            </InputSpacer>
            <InputSpacer className='flex items-center justify-center'>
              {currentPage >= pageSize ? (
                <span className='cursor-not-allowed rounded-bl-sm rounded-tl-sm border border-slate-300 bg-white/60 p-2 shadow-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: pagePath.home,
                    search: createSearchParams({
                      ...productsQuery,
                      page: (currentPage + 1).toString()
                    }).toString()
                  }}
                  className='rounded-br-sm rounded-tr-sm border border-slate-300 bg-gray-300/40 p-2 shadow-sm hover:bg-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </Link>
              )}
            </InputSpacer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
