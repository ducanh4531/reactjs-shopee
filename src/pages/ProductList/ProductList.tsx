import { Pagination } from 'src/components/Pagination'
import useProducts from 'src/hooks/useProducts'
import useProductsQuery, { ProductsQuery } from 'src/hooks/useProductsQuery'
import { AsideFilter } from './components/AsideFilter'
import { Product } from './components/Product'
import { SortProductList } from './components/SortProductList'

const ProductList = () => {
  const productsQuery: ProductsQuery = useProductsQuery()

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
