import Badge from '@/components/Badge'
import Text from '@/components/base/Text'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetTags } from '@/services/profile/hook'
import { RestElectedProfileResponse, RestProfilResponse } from '@/services/profile/schema'
import { TreeDeciduous } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

const tagsMapping = (tag: RestProfilResponse['tags'][number]) => {
  switch (tag.type) {
    case 'adherent':
      return { label: `Adhérent ${tag.label}`, theme: 'blue' } as const
    case 'elu':
      return { label: `Élu ${tag.label}`, theme: 'green' } as const
    case 'sympathisant':
      return { label: `Sympathisant ${tag.label}`, theme: 'orange' } as const
    default:
      return { label: `${tag.label}`, theme: 'gray' } as const
  }
}

const Tags = (props: { tags: RestProfilResponse['tags'] }) => {
  const mappedTags = props.tags.map(tagsMapping)
  return (
    <XStack gap="$2">
      {mappedTags.map(({ theme, label }) => (
        <XStack>
          <Badge theme={theme} key={label}>
            {label}
          </Badge>
        </XStack>
      ))}
    </XStack>
  )
}

const NotElu = () => <Text.P>Vous n’avez pas de mandat rattaché à votre profil.</Text.P>
const Elu = (props: { mandates: RestElectedProfileResponse['elect_mandates']; tags: RestProfilResponse['tags'] }) => {
  return (
    <YStack gap="$4">
      <Tags tags={props.tags} />
      <Text.MD>Mandats rattachés au compte </Text.MD>
      <Text.P>Le bureau de l’Assemblée départementale vous a rattaché {props.mandates.length} mandats.</Text.P>
      <XStack gap="$2">
        {props.mandates.map((x) => (
          <XStack>
            <Badge theme="green" key={x.mandate_type}>
              {x.mandate_type_label}
            </Badge>
          </XStack>
        ))}
      </XStack>
    </YStack>
  )
}

export default function (props: { profil: RestElectedProfileResponse }) {
  const tags = useGetTags({ tags: ['adherent', 'elu', 'sympathisant'] })
  const content = props.profil.elect_mandates.length > 0 ? <Elu mandates={props.profil.elect_mandates} tags={tags ?? []} /> : <NotElu />
  return (
    <VoxCard>
      <VoxCard.Content>
        <XStack gap="$2" alignItems="center">
          <TreeDeciduous size="$1" color="$textPrimary" />
          <Text.LG>Information d'élu</Text.LG>
        </XStack>
        {content}
      </VoxCard.Content>
    </VoxCard>
  )
}
