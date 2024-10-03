import { useSession } from '@/ctx/SessionProvider'
import * as api from '@/services/profile/api'
import { RestProfilResponse, RestProfilResponseTagTypes, RestUpdateProfileRequest } from '@/services/profile/schema'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { useToastController } from '@tamagui/toast'
import { PlaceholderDataFunction, useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

export const PROFIL_QUERY_KEY = 'profil'

export const useGetProfil = (props?: { enabled?: boolean; placeholderData?: RestProfilResponse | PlaceholderDataFunction<RestProfilResponse> }) => {
  return useQuery({
    queryKey: [PROFIL_QUERY_KEY],
    queryFn: () => api.getProfile(),
    enabled: props?.enabled,
    staleTime: 1000 * 60 * 5,
    placeholderData: props?.placeholderData,
  })
}

export const useGetUserScopes = ({ enabled }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ['userScopes'],
    queryFn: () => api.getUserScopes(),
    enabled,
  })
}

export const useGetDetailProfil = () => {
  return useSuspenseQuery({
    queryKey: ['profileDetail'],
    queryFn: () => api.getDetailedProfile(),
    staleTime: 1000 * 60 * 5,
  })
}

class UnsubscribedError extends Error {
  data: RestProfilResponse
  constructor(data: RestProfilResponse) {
    super('Not subscribed')

    this.data = data
  }
}

export const useGetResubscribeLoop = (props: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['profil'],
    queryFn: () =>
      api.getProfile().then((data) => {
        if (!data.email_subscribed) {
          throw new UnsubscribedError(data)
        }
        return data
      }),
    enabled: props.enabled,
    retry: (failureCount, error) => {
      if (error instanceof UnsubscribedError) {
        if (failureCount < 3) {
          return true
        } else {
          ErrorMonitor.log("Can't resubscribe", {
            obfusctedName: error.data.first_name.slice(0, 2) + '*** ' + error.data.last_name.slice(0, 2) + '***',
            uuid: error.data.uuid,
          })
          return false
        }
      }
      return false
    },
    retryDelay: 5000,
  })
}

export const useMutationUpdateProfil = ({ userUuid }: { userUuid: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RestUpdateProfileRequest) => api.updateProfile(userUuid, data),
    onSuccess: () => {
      toast.show('Succès', { message: 'Profil mis à jour', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: [PROFIL_QUERY_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: ['profileDetail'],
      })
      queryClient.invalidateQueries({
        queryKey: ['electProfil'],
      })
    },
    onError: (error, profil) => {
      toast.show('Erreur', { message: 'Impossible de mettre à jour le profil', type: 'error' })
    },
  })
}

export const useDeleteProfil = () => {
  const queryClient = useQueryClient()
  const toast = useToastController()

  return useMutation({
    mutationFn: () => api.removeProfile(),
    onSuccess: () => {
      queryClient.clear()
      toast.show('Succès', { message: 'Compte supprimé avec succès', type: 'success' })
    },
    onError: (e) => {
      toast.show('Erreur', { message: 'Impossible de supprimer le profil', type: 'error' })
      return e
    },
  })
}

export const useGetDonations = () => {
  return useQuery({
    queryKey: ['donations'],
    queryFn: () => api.getDonations(),
  })
}

export const useGetElectProfil = () => {
  const { user } = useSession()
  const userUuid = user?.data?.uuid
  return useSuspenseQuery({
    queryKey: ['electProfile', userUuid],
    queryFn: () => api.getElectedProfil(userUuid!),
  })
}

export const useGetTags = ({ tags }: { tags: RestProfilResponseTagTypes[] }) => {
  const profil = useGetProfil()
  return { tags: profil.data?.tags?.filter((x) => tags.includes(x.type)), ...profil }
}

export const usePostElectPayment = () => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  const { user } = useSession()
  const userUuid = user?.data?.uuid
  return useMutation({
    mutationFn: api.postElectPayment,
    onSuccess: () => {
      toast.show('Succès', { message: 'Informations bancaire actualisé', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: ['electProfile', userUuid],
      })
      queryClient.invalidateQueries({
        queryKey: [PROFIL_QUERY_KEY],
      })
    },
    onError: (e) => {
      toast.show('Erreur', { message: 'Impossible de mettre à jour vos informations bancaire', type: 'error' })
      return e
    },
  })
}

export const usePostElectDeclaration = () => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  const { user } = useSession()
  const userUuid = user?.data?.uuid
  return useMutation({
    mutationFn: api.postElectDeclaration,
    onSuccess: () => {
      toast.show('Succès', { message: 'Déclaration actualisé', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: ['electProfile', userUuid],
      })
      queryClient.invalidateQueries({
        queryKey: [PROFIL_QUERY_KEY],
      })
    },
    onError: (e) => {
      toast.show('Erreur', { message: 'Impossible de mettre à jour votre déclaration', type: 'error' })
      return e
    },
  })
}

export const usePostProfilPicture = (props: { uuid: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (x: string) => api.postProfilePicture(props.uuid, { content: x }),
    onSuccess: () => {
      toast.show('Succès', { message: 'Photo de profil mise à jour', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: [PROFIL_QUERY_KEY],
      })
    },
    onError: (e) => {
      toast.show('Erreur', { message: 'Impossible de mettre à jour votre photo de profil', type: 'error' })
      return e
    },
  })
}

export const useDeleteProfilPicture = (props: { uuid: string }) => {
  const toast = useToastController()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.deleteProfilePicture(props.uuid),
    onSuccess: () => {
      toast.show('Succès', { message: 'Photo de profil supprimé', type: 'success' })
      queryClient.invalidateQueries({
        queryKey: [PROFIL_QUERY_KEY],
      })
    },
    onError: (e) => {
      toast.show('Erreur', { message: 'Impossible de mettre à jour votre photo de profil', type: 'error' })
      return e
    },
  })
}
