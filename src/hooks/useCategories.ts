import { useQuery } from '@tanstack/react-query'
import categoriesService from 'src/services/categoriesService'

const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getAll()
  })
}

export default useCategories
