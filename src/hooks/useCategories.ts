import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import categoriesService from 'src/services/categoriesService'

const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getAll(),
    staleTime: ms('24h')
  })
}

export default useCategories
