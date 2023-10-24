import { Link } from 'react-router-dom'
import { ProductRating } from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/Product.type'
import { formatToCompactValue, formatToLocalizedValue } from 'src/utils/utils'

interface ProductProps {
  product: ProductType
}

const Product = ({ product }: ProductProps) => {
  return (
    <Link to={product._id}>
      <div className='bg-white shadow overflow-hidden rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatToLocalizedValue(product.price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatToLocalizedValue(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <ProductRating productRating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatToCompactValue(product.sold)}</span>
              <span className='ml-1'>sold</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
