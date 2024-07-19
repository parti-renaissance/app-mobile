import { Linking } from 'react-native'
import { Button } from '@/components'
import VoxCard, { VoxCardFrameProps } from '@/components/VoxCard/VoxCard'
import type { RestAlertsResponse } from '@/services/alerts/schema'
import { genericErrorThrower } from '@/services/errors/generic-errors'
import { XStack } from 'tamagui'

export type AlertVoxCardProps = {
  payload: RestAlertsResponse[0]
} & VoxCardFrameProps

const AlertCard = ({ payload, ...props }: AlertVoxCardProps) => {
  const onShow = async () => {
    if (payload.cta_url && (await Linking.canOpenURL(payload.cta_url))) {
      await Linking.openURL(payload.cta_url).catch(genericErrorThrower)
    }
  }
  return (
    <VoxCard {...props}>
      <VoxCard.Content>
        <XStack justifyContent="space-between">
          <VoxCard.Chip news>{payload.label}</VoxCard.Chip>
        </XStack>
        <VoxCard.Title>{payload.title}</VoxCard.Title>
        <VoxCard.Description markdown>{payload.description}</VoxCard.Description>
        {payload.cta_label && payload.cta_url && (
          <XStack justifyContent="flex-end">
            <Button variant="contained" onPress={onShow}>
              <Button.Text>{payload.cta_label}</Button.Text>
            </Button>
          </XStack>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

export default AlertCard
