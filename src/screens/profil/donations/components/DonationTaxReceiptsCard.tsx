import { Fragment } from 'react'
import { Platform } from 'react-native'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import _EmptyState from '@/components/EmptyStates/EmptyState'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetTaxReceiptFile, useGetTaxReceipts } from '@/services/profile/hook'
import { RestTaxReceiptsRequest, RestTaxReceiptsResponse } from '@/services/profile/schema'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { Download } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { isWeb, XStack } from 'tamagui'

const DownloadBtn = ({ receipt }: { receipt: RestTaxReceiptsResponse[number] }) => {
  const { mutateAsync: getFile, isPending: isFilePending } = useGetTaxReceiptFile()
  const toast = useToastController()
  const handleDownload =
    ({ uuid, label }: RestTaxReceiptsResponse[number]) =>
    async () => {
      try {
        if (isWeb) {
          const file: Blob = await getFile({ uuid, label })
          const url = URL.createObjectURL(file)
          const a = document.createElement('a')
          a.href = url
          a.download = `reçu-fiscal-${label}.pdf`
          document.body.appendChild(a)
          a.click()
          URL.revokeObjectURL(url)
        } else {
          const { uri }: FileSystem.FileSystemDownloadResult = await getFile({ uuid, label })
          if (Platform.OS === 'android') {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

            if (permissions.granted) {
              const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })

              await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, `reçu-fiscal-${label}.pdf`, 'application/pdf').then(
                async (uri) => {
                  await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
                },
              )
            } else {
              await shareAsync(uri, {
                mimeType: 'application/pdf',
                dialogTitle: `Reçu fiscal ${label}`,
                UTI: 'com.adobe.pdf',
              })
            }
          } else {
            await shareAsync(uri, {
              mimeType: 'application/pdf',
              dialogTitle: `Reçu fiscal ${label}`,
              UTI: 'com.adobe.pdf',
            })
          }
        }
      } catch (error) {
        toast.show('Erreur', { message: 'Une erreur est survenue lors du téléchargement du fichier', type: 'error' })
        ErrorMonitor.log('Error while downloading tax receipt', error)
      }
    }
  return (
    <VoxButton theme="gray" variant="text" iconLeft={Download} bg="white" onPress={handleDownload(receipt)} loading={isFilePending}>
      Télécharger
    </VoxButton>
  )
}

const DonationTaxReceiptCard = () => {
  const { data, isPending } = useGetTaxReceipts()
  if (isPending) {
    return (
      <SkeCard>
        <SkeCard.Content>
          <SkeCard.Title />
          <SkeCard.Content>
            <SkeCard.Description />
          </SkeCard.Content>
        </SkeCard.Content>
      </SkeCard>
    )
  }
  if (!data || data.length === 0) {
    return null
  }
  return (
    <VoxCard>
      <VoxCard.Content>
        <Text.LG>Reçu fiscaux</Text.LG>
        <VoxCard bg="$textSurface" inside>
          <VoxCard.Content>
            {data.map((receipt, i) => (
              <Fragment key={receipt.uuid}>
                <XStack gap="$2" flex={1} justifyContent="space-between" alignItems="center">
                  <Text.MD>{receipt.label}</Text.MD>
                  <DownloadBtn receipt={receipt} />
                </XStack>
                {i < data.length - 1 && <VoxCard.Separator borderColor="$gray/32" />}
              </Fragment>
            ))}
          </VoxCard.Content>
        </VoxCard>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default DonationTaxReceiptCard
