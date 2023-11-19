import { useQuery } from '@tanstack/react-query'
import ms from 'ms'
import categories from 'src/data/categories'
import categoriesService from 'src/services/categoriesService'

const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getAll(),
    staleTime: ms('1 day'),
    initialData: categories
  })
}

export default useCategories
