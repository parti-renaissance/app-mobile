import { protectedRoutes } from '@/config/protectedRoutes'
import { useSegments } from 'expo-router'

const useProtectedRoute = () => {
  const segments = useSegments()
  const isProtectedRoute = !!protectedRoutes.find((route) => '/' + segments.join('/').startsWith(route))

  return { isProtectedRoute }
}

export default useProtectedRoute
