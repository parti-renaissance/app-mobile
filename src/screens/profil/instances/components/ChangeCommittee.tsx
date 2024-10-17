import { ComponentPropsWithoutRef, memo, useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, Platform, View } from 'react-native'
import Text from '@/components/base/Text'
import BoundarySuspenseWrapper from '@/components/BoundarySuspenseWrapper'
import { VoxButton } from '@/components/Button'
import { VoxHeader } from '@/components/Header/Header'
import ModalOrPageBase from '@/components/ModalOrPageBase/ModalOrPageBase'
import { createDoubleIcon } from '@/components/utils'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetCommittees } from '@/services/committee/hook'
import { Diamond, X } from '@tamagui/lucide-icons'
import { useMedia, YStack } from 'tamagui'
import CommitteeCard from './CommitteeCard'
import { InstanceCardHeader } from './InstanceCard'

const DoubleDiamond = createDoubleIcon({ icon: Diamond })

const MemoizedCommitteeCard = memo(CommitteeCard)

const ChangeCommiteeList = ({ currentUuid }: { currentUuid: string | null }) => {
  const { data } = useGetCommittees()

  const list = useMemo(() => {
    if (currentUuid) {
      const index = data.findIndex((x) => x.uuid === currentUuid)
      if (index !== -1) {
        const [selected] = data.splice(index, 1)
        data.unshift(selected)
      }
    }
    return data
  }, [data, currentUuid])

  const [selected, setSelected] = useState<string | null>(currentUuid)
  const { current: handlePress } = useRef((uuid: string) => () => {
    setSelected(uuid)
  })
  const media = useMedia()
  const key = media.gtSm ? 'gtSm' : 'sm'
  return (
    <FlatList
      style={{ flex: 1 }}
      data={list}
      key={key}
      numColumns={media.gtSm ? 2 : undefined}
      ListHeaderComponent={
        <Text.P $gtSm={{ pb: 16 }}>
          Trouvez un comité dans la région des Hauts-de-Seine Si vous avez déménagé et souhaitez changer de comité, mettez à jour votre adresse ici.
        </Text.P>
      }
      renderItem={({ item }) => <MemoizedCommitteeCard committee={item} selected={selected === item.uuid} onPress={handlePress(item.uuid)} />}
      keyExtractor={(item) => item.uuid}
      contentContainerStyle={{ gap: media.gtSm ? 0 : 16, flex: 1, flexGrow: 1, padding: 16, marginBottom: 24 }}
      columnWrapperStyle={media.gtSm ? { gap: 16, paddingBottom: 16 } : undefined}
    />
  )
}

export default function ChangeCommitteeModal({
  currentCommitteeUuid,
  ...modalProps
}: Omit<ComponentPropsWithoutRef<typeof ModalOrPageBase>, 'header'> & { currentCommitteeUuid: string | null }) {
  console.log(currentCommitteeUuid)
  const windowSize = Dimensions.get('window')
  const media = useMedia()
  const maxHeight = media.sm ? windowSize.height - 56 : windowSize.height * 0.8
  const width = media.sm ? '100%' : 616
  const [headerHeight, setHeaderHeight] = useState(0)
  console.log(headerHeight, maxHeight)
  return (
    <ModalOrPageBase
      {...modalProps}
      scrollable={false}
      header={
        <YStack>
          <VoxHeader.ModalFrame justifyContent="space-between">
            <VoxHeader.Title icon={DoubleDiamond}>Changer de comité</VoxHeader.Title>
            <VoxButton onPress={modalProps.onClose} variant="text" iconLeft={X} size="lg"></VoxButton>
          </VoxHeader.ModalFrame>
        </YStack>
      }
    >
      <YStack flex={1} width={width} height={maxHeight} gap={0}>
        {media.gtSm ? (
          <VoxCard.Content
            pb={0}
            onLayout={(x) => {
              setHeaderHeight(x.nativeEvent.layout.height)
            }}
          >
            <InstanceCardHeader
              icon={DoubleDiamond}
              title="Changer de comité"
              headerLeft={<VoxButton onPress={modalProps.onClose} variant="text" iconLeft={X} size="lg"></VoxButton>}
            />
          </VoxCard.Content>
        ) : null}
        <View style={{ flex: 1 }}>
          <BoundarySuspenseWrapper>
            <ChangeCommiteeList currentUuid={currentCommitteeUuid} />
          </BoundarySuspenseWrapper>
        </View>
      </YStack>
    </ModalOrPageBase>
  )
}
