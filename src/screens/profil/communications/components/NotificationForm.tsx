import React from 'react'
import SwitchGroup from '@/components/base/SwitchGroup/SwitchGroup'
import Text from '@/components/base/Text'
import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { useGetDetailProfil, useGetNotificationList, useMutationUpdateProfil } from '@/services/profile/hook'
import { RestDetailedProfileResponse } from '@/services/profile/schema'
import { Controller, useForm } from 'react-hook-form'
import { Separator, XStack } from 'tamagui'
import * as z from 'zod'

const NotificationForm = (props: { cardProps?: React.ComponentProps<typeof VoxCard>; profile: RestDetailedProfileResponse }) => {
  const subscription_types = props.profile.subscription_types
  const user_subscription_values = subscription_types.map((st) => st.code)

  const { data: _notificationList } = useGetNotificationList()
  const notificationList = _notificationList.map((n) => ({ type: n.type, label: n.label, value: n.code }))
  const emailList = notificationList.filter((n) => n.type === 'email')
  const smsList = notificationList.filter((n) => n.type === 'sms')
  const { control, handleSubmit, formState, reset, setError } = useForm({
    values: { subscription_email: user_subscription_values, subscription_sms: user_subscription_values },
    mode: 'all',
  })
  const { isDirty, isValid } = formState

  const onSubmit = handleSubmit((data) => {
    console.log(new Set(Object.values(data).flat()))
  })

  return (
    <VoxCard {...props.cardProps}>
      <VoxCard.Content>
        <VoxCard.Title>Préférences de communication</VoxCard.Title>
        <Text.MD multiline secondary semibold>
          Par SMS
        </Text.MD>
        <Text.P>Nous n’envoyons des SMS que très rarement, pour les occasions les plus importantes.</Text.P>
        <Controller
          name="subscription_sms"
          control={control}
          render={({ field }) => {
            return <SwitchGroup options={smsList} onChange={field.onChange} value={field.value} />
          }}
        />
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
          <VoxButton variant="outlined" theme="blue" onPress={onSubmit} disabled={!isDirty || !isValid}>
            Enregister
          </VoxButton>
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default NotificationForm
