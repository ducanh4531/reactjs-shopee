interface ProductRatingProps {
  productRating: number
  activeClassname?: string
  inactiveClassname?: string
}

const ProductRating = ({
  productRating,
  activeClassname = 'h-3 w-3 fill-yellow-300 text-yellow-300',
  inactiveClassname = 'h-3 w-3 fill-current text-gray-300'
}: ProductRatingProps) => {
  const handleWidth = (order: number) => {
    if (order <= productRating) {
      return '100%'
    } else if (order - productRating >= 1) {
      return '0%'
    } else {
      return `${(productRating - Math.floor(productRating)) * 100}%`
    }
  }

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div
              style={{
                width: handleWidth(index + 1)
              }}
              className='absolute left-0 top-0 h-full overflow-hidden'
            >
              <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={activeClassname}>
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>

            <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={inactiveClassname}>
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        ))}
    </div>
  )
}

export default ProductRating
