import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'src/components/Button'
import { ProductRating } from 'src/components/ProductRating'
import { QuantityController } from 'src/components/QuantityController'
import useAddToCart from 'src/hooks/useAddToCart'
import useProduct from 'src/hooks/useProduct'
import useProducts from 'src/hooks/useProducts'
import { ProductsQuery } from 'src/hooks/useProductsQuery'
import { Product as ProductType } from 'src/types/Product.type'
import { formatToCompactValue, formatToLocalizedValue, getSaleRate } from 'src/utils/utils'
import { Product } from '../ProductList/components/Product'

const ProductDetail = () => {
  const [imageIndexes, setImageIndexes] = useState([0, 5])
  const [currentImg, setCurrentImg] = useState('')
  const [buyCount, setBuyCount] = useState<string | number>(1)
  const imgRef = useRef<HTMLImageElement>(null)
  const { data } = useProduct()
  const product = data?.data
  const productsQuery: ProductsQuery = { page: '1', category: product?.category._id }
  const { data: productsData } = useProducts(product ? productsQuery : {})
  const products = productsData?.data.products
  const addToCartMutation = useAddToCart()

  useEffect(() => {
    if (product) {
      setCurrentImg(product.image)
    }
  }, [product])

  const productImages = useMemo(() => product?.images.slice(...imageIndexes) || [], [product, imageIndexes])

  const handleHoverImg = (image: string) => {
    setCurrentImg(image)
  }

  const handleBack = () => {
    if (imageIndexes[0] > 0) setImageIndexes(imageIndexes.map((index) => index - 1))
  }

  const handleNext = () => {
    if (imageIndexes[1] < (product as ProductType).images.length)
      setImageIndexes(imageIndexes.map((index) => index + 1))
  }

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // get the actual width/height of the div parent
    const rect = e.currentTarget.getBoundingClientRect()

    if (imgRef.current) {
      const img = imgRef.current

      // destructuring img to get its original width/height
      const { naturalHeight, naturalWidth } = img
      img.style.width = `${naturalWidth}px`
      img.style.height = `${naturalHeight}px`
      img.style.maxWidth = 'unset'

      // const { offsetX, offsetY } = e.nativeEvent

      // console.log('(e.nativeEvent.offset) x, y coordinates the mouse cursor, relative to the div', offsetX, offsetY)
      // console.log('(e.page) x, y coordinates the mouse cursor, relative to the document (webpage)', e.pageX, e.pageY)
      // console.log('(rect) x, y coordinates the div, relative to the viewport', rect.x, rect.y)
      // console.log(
      //   'the number of pixels the document has scrolled from the upper left corner of the window',
      //   window.scrollX,
      //   window.scrollY
      // )

      const offsetX = e.pageX - (rect.x + window.scrollX)
      const offsetY = e.pageY - (rect.y + window.scrollY)

      // console.log('1', 1 - naturalHeight / rect.height, 1 - naturalWidth / rect.width)
      const top = offsetY * (1 - naturalHeight / rect.height)
      const left = offsetX * (1 - naturalWidth / rect.width)

      // console.log('y', top, 'x', left)
      img.style.top = `${top}px`
      img.style.left = `${left}px`
    }
  }

  const handleLeave = () => {
    if (imgRef.current) {
      const img = imgRef.current

      img.removeAttribute('style')
    }
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(!value ? '' : value)
  }

  if (!product) return null

  const handleAddToCart = () => {
    addToCartMutation.mutate({ product_id: product._id, buy_count: Number(buyCount) })
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleLeave}
              >
                <img
                  src={currentImg}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imgRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <Button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handleBack}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </Button>
                {productImages.slice(0, 5).map((image) => {
                  const isActive = image === currentImg
                  return (
                    <div key={image} onMouseEnter={() => handleHoverImg(image)} className='relative w-full pt-[100%]'>
                      <img
                        src={image}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 cursor-pointer border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <Button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handleNext}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </Button>
              </div>
            </div>

            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating.toFixed(1)}</span>
                  <ProductRating
                    productRating={product.rating}
                    activeClassname='h-4 w-4 fill-orange text-orange'
                    inactiveClassname='h-4 w-4 fill-current text-gray-300'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatToCompactValue(product.sold)}</span>
                  <span className='ml-1 capitalize text-gray-500'>sold</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  ₫{formatToLocalizedValue(product.price_before_discount)}
                </div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatToLocalizedValue(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {getSaleRate(product.price_before_discount, product.price)}% off
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='ml-10 capitalize text-gray-500'>quantity</div>
                <QuantityController
                  max={product.quantity}
                  value={buyCount}
                  onTyping={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} pieces available</div>
              </div>
              <div className='mt-8 flex items-center'>
                <Button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  onClick={handleAddToCart}
                >
                  <div className='flex items-center justify-center'>
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                    >
                      <g>
                        <g>
                          <polyline
                            fill='none'
                            points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy='13.5' r={1} stroke='none' />
                          <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                        </g>
                        <line
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          x1='7.5'
                          x2='10.5'
                          y1={7}
                          y2={7}
                        />
                        <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                      </g>
                    </svg>
                    <span>add to cart</span>
                  </div>
                </Button>
                <Button className=' ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm border border-orange bg-orange px-5 capitalize text-white shadow-sm hover:bg-orange/95'>
                  buy now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg uppercase text-slate-700'>product description</div>
          <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-8'>
          <p className='font-medium uppercase text-gray-400'>you may also like</p>
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {products &&
              products.map((product) => (
                <div key={product._id} className='col-span-1'>
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
