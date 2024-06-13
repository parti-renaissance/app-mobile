import React from 'react'
import Text from '@/components/base/Text'
import { ActionCard } from '@/components/Cards'
import EmptyState from '@/components/EmptyStates/EmptyEvent/EmptyEvent'
import { RestAction } from '@/data/restObjects/RestActions'
import { ScrollView, Sheet, XStack, YStack } from 'tamagui'
import { mapPayload } from './utils'
import type { useSheetPosition } from './utils'

type ActionListProps = {
  actions: RestAction[]
  setActiveAction: (action: RestAction | null) => void
}

export const ActionList = (props: ActionListProps) => {
  return props.actions.length === 0 ? (
    <EmptyState state="actions" />
  ) : (
    props.actions.map((action) => <ActionCard key={action.uuid} payload={mapPayload(action)} onShow={() => props.setActiveAction(action)} />)
  )
}

type ContainerListProps = ActionListProps & { postionConfig: ReturnType<typeof useSheetPosition>; open: boolean; onOpenChange: (x: boolean) => void }

export const SideList = (props: ContainerListProps & { children: React.ReactNode }) => {
  return (
    <XStack
      zIndex={100}
      animation="quick"
      key="side-list"
      animateOnly={['transform']}
      transform={[{ translateX: props.open ? 0 : '-100%' }]}
      position="absolute"
      flex={1}
      left={0}
      bottom={0}
      top={0}
    >
      <YStack elevation={5} width={500} flex={1} backgroundColor={'$gray1'}>
        <ScrollView
          contentContainerStyle={{
            p: '$4',
            gap: '$3',
          }}
          flex={1}
        >
          <ActionList {...props} />
        </ScrollView>
      </YStack>
      <YStack position="absolute" left="100%">
        {props.children}
      </YStack>
    </XStack>
  )
}

export const BottomSheetList = ({ postionConfig, onOpenChange, open, ...props }: ContainerListProps) => {
  const { position, setPosition, handleHandlePress, defaultPosition } = postionConfig
  const handlePositionChange = (position: number) => {
    setPosition(position)
  }

  const handleOpeningChange = (open: boolean) => {
    onOpenChange(open)
    if (!open) {
      setPosition(1)
    }
  }

  const pageMode = position === 0

  return (
    <Sheet
      open={open}
      native
      defaultOpen={true}
      defaultPosition={defaultPosition}
      position={position}
      dismissOnOverlayPress={false}
      onPositionChange={handlePositionChange}
      onOpenChange={handleOpeningChange}
      snapPoints={['70%', 60]}
      snapPointsMode="mixed"
    >
      <Sheet.Frame borderTopLeftRadius={pageMode ? 0 : 20} borderTopRightRadius={pageMode ? 0 : 20}>
        <YStack onPress={handleHandlePress}>
          <Sheet.Handle backgroundColor="$textDisabled" mt="$3.5" mb="$0" height={3} width={50} alignSelf="center" onPress={handleHandlePress} />
          <XStack justifyContent="center" p="$3">
            <Text fontWeight={'$6'} color="$textDisabled" textAlign="center">
              Toutes les actions
            </Text>
          </XStack>
        </YStack>
        <Sheet.ScrollView
          scrollEnabled={position === 0}
          flex={1}
          contentContainerStyle={{
            pt: '$2',
            pb: '$2',
            backgroundColor: '$gray2',
            gap: '$2',
          }}
        >
          {/* {data} */}
          <ActionList {...props} />
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}
