import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import SkeCard from '@/components/Skeleton/CardSkeleton'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import { useFileDownload } from '@/hooks/useFileDownload'
import { RestGetFormationsResponse } from '@/services/formations/schema'
import { Download, GraduationCap, Share } from '@tamagui/lucide-icons'
import { Href, Link } from 'expo-router'
import { snakeCase } from 'lodash'
import { isWeb, XStack, YStackProps } from 'tamagui'

const LinkBtn = ({ link }: { link: string }) => {
  return (
    <Link href={link as Href} target="_blank" asChild={!isWeb}>
      <VoxButton variant="outlined" iconLeft={Share}>
        Voir la formation
      </VoxButton>
    </Link>
  )
}

const DownloadBtn = (props: { file_path: string; fileName: string }) => {
  const { handleDownload, isPending } = useFileDownload()
  const fileName = snakeCase(props.fileName)
  const handlePress = () => handleDownload({ url: props.file_path.replace(clientEnv.API_BASE_URL, ''), fileName })
  return (
    <VoxButton variant="outlined" iconLeft={Download} loading={isPending} onPress={handlePress}>
      Télécharger
    </VoxButton>
  )
}

const Btn = ({ payload }: { payload: RestGetFormationsResponse[number] }) => {
  if (payload.file_path) {
    return <DownloadBtn fileName={payload.title} file_path={payload.file_path} />
  } else if (payload.link) {
    return <LinkBtn link={payload.link} />
  }
  return null
}

type Props = {
  payload: RestGetFormationsResponse[number]
  last?: boolean
}

export const FormaCard = ({ payload, last, ...props }: Props & YStackProps) => {
  const chipLabel = payload.visibility === 'local' ? 'Formation locale' : 'Formation nationale'
  const chipTheme = payload.visibility === 'local' ? 'green' : 'blue'
  return (
    <VoxCard.Content borderBottomWidth={last ? 0 : 1} borderColor="$textOutline" padding={0} paddingBottom={last ? 0 : 16} backgroundColor="$white1" {...props}>
      <XStack justifyContent="space-between">
        <VoxCard.Chip theme={chipTheme} icon={GraduationCap}>
          {chipLabel}
        </VoxCard.Chip>
        {payload.category ? <VoxCard.Chip>{payload.category}</VoxCard.Chip> : null}
      </XStack>
      <Text.LG>{payload.title}</Text.LG>
      <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
      <Btn payload={payload} />
    </VoxCard.Content>
  )
}

export const FormaCardSkeleton = ({ last, ...props }: Omit<Props, 'payload'> & YStackProps) => {
  return (
    <SkeCard>
      <SkeCard.Content
        borderBottomWidth={last ? 0 : 1}
        padding={0}
        paddingBottom={last ? 0 : 16}
        borderColor={'$textOutline'}
        backgroundColor="$white1"
        {...props}
      >
        <XStack justifyContent="space-between">
          <SkeCard.Chip />
          <SkeCard.Chip />
        </XStack>
        <SkeCard.Title />
        <SkeCard.Description />
        <SkeCard.Button />
      </SkeCard.Content>
    </SkeCard>
  )
}
