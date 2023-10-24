import { useSearchParams } from 'react-router-dom'
import { ProductsConfig } from 'src/types/Product.type'

const useQueryParams = (): ProductsConfig => {
  const [searchParams] = useSearchParams()

  return Object.fromEntries([...searchParams])
}

export default useQueryParams
