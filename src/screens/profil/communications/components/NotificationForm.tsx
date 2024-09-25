import React from 'react'
import SwitchGroup from '@/components/base/SwitchGroup/SwitchGroup'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import { MessageCard } from '@/components/MessageCard/MessageCard'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useSession } from '@/ctx/SessionProvider'
import { useGetNotificationList, useGetReSubscribeConfig } from '@/services/notifications/hook'
import { useMutationUpdateProfil } from '@/services/profile/hook'
import { RestDetailedProfileResponse } from '@/services/profile/schema'
import { AlertTriangle, Info } from '@tamagui/lucide-icons'
import { Controller, useForm } from 'react-hook-form'
import { Separator, XStack, YStack } from 'tamagui'

const UnSubscribeCase = () => {
  return (
    <YStack gap={16}>
      <MessageCard
        iconLeft={AlertTriangle}
        theme="orange"
        rightComponent={
          <YStack>
            <VoxButton disabled theme="orange">
              Me réabonner
            </VoxButton>
          </YStack>
        }
      >
        Vous êtes désabonné de toutes nos communications.
      </MessageCard>
      <YStack>
        <Text.SM>(Le réabonnement sera de nouveau possible prochainement)</Text.SM>
      </YStack>
    </YStack>
  )
}

const NotificationForm = (props: { cardProps?: React.ComponentProps<typeof VoxCard>; profile: RestDetailedProfileResponse }) => {
  const {
    user: { data: userData },
  } = useSession()
  const subscription_types = props.profile.subscription_types
  const user_subscription_values = subscription_types.map((st) => st.code)

  const { data: _notificationList } = useGetNotificationList()
  const notificationList = _notificationList.map((n) => ({ type: n.type, label: n.label, value: n.code }))
  const emailList = notificationList.filter((n) => n.type === 'email')
  const smsList = notificationList.filter((n) => n.type === 'sms')
  const { control, handleSubmit, formState, reset } = useForm({
    values: { subscription_email: user_subscription_values, subscription_sms: user_subscription_values },
    mode: 'all',
  })
  const { isDirty, isValid } = formState

  const { mutateAsync, isPending } = useMutationUpdateProfil({ userUuid: props.profile.uuid })

  const onSubmit = handleSubmit((data) => {
    return mutateAsync({ subscription_types: Object.values(data).flat() })
  })

  const SmsSection = () => {
    return (
      <>
        <Text.MD multiline secondary semibold>
          Par SMS
        </Text.MD>
        {props.profile.phone ? (
          <>
            <Text.P>Nous n’envoyons des SMS que très rarement, pour les occasions les plus importantes.</Text.P>
            <Controller
              name="subscription_sms"
              control={control}
              render={({ field }) => {
                return <SwitchGroup options={smsList} onChange={field.onChange} value={field.value} />
              }}
            />
          </>
        ) : (
          <MessageCard iconLeft={Info} theme="yellow">
            Ajoutez un numéro de téléphone pour ne pas manquer les informations les plus importantes.
          </MessageCard>
        )}
      </>
    )
  }

  return (
    <VoxCard {...props.cardProps}>
      <VoxCard.Content>
        <VoxCard.Title>Préférences de communication</VoxCard.Title>
        {userData && !userData.email_subscribed ? (
          <UnSubscribeCase />
        ) : (
          <>
            <SmsSection />
            <Separator backgroundColor="$textOutlined" />
            <Text.MD multiline secondary semibold>
              Par Email
            </Text.MD>
            <Text.P>En cochant ces cases j’accepte de recevoir les emails : </Text.P>
            <Controller
              name="subscription_email"
              control={control}
              render={({ field }) => {
                return <SwitchGroup options={emailList} onChange={field.onChange} value={field.value} />
              }}
            />
            <XStack justifyContent="flex-end" gap="$2">
              <VoxButton variant="outlined" display={isDirty ? 'flex' : 'none'} onPress={() => reset()}>
                Annuler
              </VoxButton>
              <VoxButton variant="outlined" theme="blue" loading={isPending} onPress={onSubmit} disabled={!isDirty || !isValid}>
                Enregister
              </VoxButton>
            </XStack>
          </>
        )}
      </VoxCard.Content>
    </VoxCard>
  )
}

export default NotificationForm
