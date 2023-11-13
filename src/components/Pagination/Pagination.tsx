import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import pagePath from 'src/constants/path'
import { ProductsQuery } from 'src/hooks/useProductsQuery'

interface PaginationProps {
  pageSize: number
  productsQuery: ProductsQuery
}

const range = 2

const Pagination = ({ pageSize, productsQuery }: PaginationProps) => {
  const currentPage = Number(productsQuery.page)

  const renderDot = (index: number, pageNumber: number) => (
    <Link
      key={index}
      to={{
        pathname: pagePath.home,
        search: createSearchParams({
          ...productsQuery,
          page: pageNumber.toString()
        }).toString()
      }}
      className='mx-2 rounded bg-white px-3 py-2 shadow-sm'
    >
      ...
    </Link>
  )

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (currentPage <= range * 2 + 1 && pageNumber > currentPage + range && pageNumber < pageSize - range + 1) {
          if (!dotAfter) {
            dotAfter = true
            return renderDot(index, pageNumber)
          }
          return null
        } else if (pageNumber > range && pageNumber < currentPage - range) {
          if (!dotBefore) {
            dotBefore = true
            return renderDot(index, currentPage - range - 1)
          }
          return null
        } else if (pageNumber > currentPage + range && pageNumber < pageSize - range + 1) {
          if (!dotAfter) {
            dotAfter = true
            return renderDot(index, pageNumber)
          }
          return null
        }

        return (
          <Link
            key={index}
            to={{
              pathname: pagePath.home,
              search: createSearchParams({
                ...productsQuery,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames('mx-2 rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === currentPage,
              'border-transparent': pageNumber !== currentPage
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {currentPage === 1 ? (
        <span className='mx-2 cursor-not-allowed rounded border border-slate-300 bg-white/60 px-3 py-2 shadow-sm'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: pagePath.home,
            search: createSearchParams({
              ...productsQuery,
              page: (currentPage > pageSize ? pageSize : currentPage - 1).toString()
            }).toString()
          }}
          className='mx-2 rounded bg-white px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}
      {renderPagination()}

      {currentPage >= pageSize ? (
        <span className='mx-2 cursor-not-allowed rounded border border-slate-300 bg-white/60 px-3 py-2  shadow-sm'>
          Next
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
          className='mx-2 rounded bg-white px-3 py-2 shadow-sm'
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
