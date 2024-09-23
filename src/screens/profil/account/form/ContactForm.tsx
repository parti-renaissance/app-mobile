import Input from '@/components/base/Input/Input'
import Select from '@/components/base/Select/Select'
import Text from '@/components/base/Text'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RestDetailedProfileResponse } from '@/services/profile/schema'
import isoToEmoji from '@/utils/isoToEmoji'
import { Info } from '@tamagui/lucide-icons'
import { getCountryCodeForRegionCode, getSupportedRegionCodes } from 'awesome-phonenumber'
import { Controller } from 'react-hook-form'
import { View, XStack } from 'tamagui'
import AbstractProfilForm from './AbstractProfilForm'
import { validateCoordFormSchema } from './schema'

const phoneCodes = getSupportedRegionCodes().map((code) => {
  return {
    value: code,
    label: `${isoToEmoji(code)} +${getCountryCodeForRegionCode(code)}`,
  }
})

const ContactForm = ({ profile }: { profile: RestDetailedProfileResponse }) => {
  return (
    <AbstractProfilForm
      uuid={profile.uuid}
      defaultValues={
        {
          email_address: profile.email_address,
          phone: {
            country: profile.phone?.country,
            number: profile.phone?.number,
          },
        } as const
      }
      validatorSchema={validateCoordFormSchema}
    >
      {({ control }) => (
        <>
          <Text.MD semibold>Contact</Text.MD>
          {profile.change_email_token?.email ? (
            <VoxCard inside bg="$yellow1">
              <VoxCard.Content>
                <XStack gap={16} alignItems="center">
                  <View width={24} height={24}>
                    <Info size={24} color="yellow7" />
                  </View>
                  <Text.MD multiline color="$yellow7" semibold>
                    Confirmez le changement de votre email en cliquant sur le lien que vous venez de recevoir sur « {profile.change_email_token.email} ». Il est
                    actif pour 24h.
                  </Text.MD>
                </XStack>
              </VoxCard.Content>
            </VoxCard>
          ) : null}
          <Controller
            name="email_address"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input color="gray" value={value} placeholder="Email" onBlur={onBlur} onChange={onChange} error={error?.message} />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <XStack gap="$3">
                <View width={130}>
                  <Select
                    color="gray"
                    value={value?.country}
                    placeholder="Indicatif"
                    options={phoneCodes}
                    onChange={(x) => onChange({ number: value?.number, country: x })}
                  />
                </View>
                <View flexGrow={1}>
                  <Input
                    value={value?.number}
                    color="gray"
                    placeholder="Téléphone"
                    onBlur={onBlur}
                    onChange={(x) => onChange({ number: x, country: value?.country })}
                    error={error?.message}
                  />
                </View>
              </XStack>
            )}
          />
        </>
      )}
    </AbstractProfilForm>
  )
}

export default ContactForm
