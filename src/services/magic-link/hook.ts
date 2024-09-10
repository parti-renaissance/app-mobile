import { useSession } from '@/ctx/SessionProvider'
import * as api from '@/services/magic-link/api'
import * as types from '@/services/magic-link/schema'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetMagicLink = ({ slug }: { slug: types.Slugs }) => {
  const { isAuth } = useSession()
  return useQuery({
    queryKey: ['magicLink', slug],
    queryFn: () => (isAuth ? api.getMagicLink({ slug }) : api.getLink({ slug })),
  })
}
