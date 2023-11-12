import { isUndefined, omitBy } from 'lodash'
import { Pagination } from 'src/components/Pagination'
import useProducts from 'src/hooks/useProducts'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductsConfig } from 'src/types/Product.type'
import { AsideFilter } from './components/AsideFilter'
import { Product } from './components/Product'
import { SortProductList } from './components/SortProductList'

export type ProductsQuery = {
  [key in keyof ProductsConfig]: string
}

const ProductList = () => {
  const queryParams = useQueryParams()
  const productsQuery: ProductsQuery = omitBy(
    {
      page: queryParams.page && queryParams.page > 0 ? queryParams.page : '1',
      limit: queryParams.limit || '3',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      category: queryParams.category,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  const { data } = useProducts(productsQuery)

  return (
    <main className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter productsQuery={productsQuery} />
          </div>
          <div className='col-span-9'>
            {data && (
              <>
                <SortProductList pageSize={data.data.pagination.page_size} productsQuery={productsQuery} />

                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {data.data.products.map((product) => (
                    <div key={product._id} className='col-span-1'>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <Pagination pageSize={data.data.pagination.page_size} productsQuery={productsQuery} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductList
