import { Fragment } from 'react'
import Input from '@/components/base/Input/Input'
import Select from '@/components/base/Select/Select'
import Text from '@/components/base/Text'
import DatePickerField from '@/components/DatePicker'
import { MessageCard } from '@/components/MessageCard/MessageCard'
import NationalitySelect from '@/components/NationalitySelect/NationalitySelect'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RestDetailedProfileResponse } from '@/services/profile/schema'
import { Info } from '@tamagui/lucide-icons'
import { Controller } from 'react-hook-form'
import { View, XStack } from 'tamagui'
import AbstractProfilForm from './AbstractProfilForm'
import { validateInformationsFormSchema } from './schema'

const InformationsForm = ({ profile }: { profile: RestDetailedProfileResponse }) => {
  return (
    <AbstractProfilForm
      uuid={profile.uuid}
      defaultValues={
        {
          gender: profile.gender,
          first_name: profile.first_name,
          last_name: profile.last_name,
          birthdate: profile.birthdate,
          nationality: profile.nationality,
        } as const
      }
      validatorSchema={validateInformationsFormSchema}
    >
      {({ control }) => (
        <Fragment>
          {profile.certified && (
            <MessageCard iconLeft={Info} theme="yellow">
              Votre profil étant certifié, vous ne pouvez pas modifier vos informations d’identité.
            </MessageCard>
          )}
          <Text.LG semibold>Identité</Text.LG>
          <View gap="$5">
            <Controller
              name="gender"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Select
                  placeholder="Civilité"
                  onBlur={onBlur}
                  color="gray"
                  search={false}
                  disabled={!!profile.certified}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                  options={[
                    { value: 'male', label: 'Monsieur' },
                    { value: 'female', label: 'Madame' },
                  ]}
                />
              )}
            />
            <View $gtMd={{ flexDirection: 'row' }} gap="$4">
              <View $gtMd={{ flex: 1, flexBasis: 0 }}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      color="gray"
                      disabled={!!profile.certified}
                      placeholder="Prénom"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </View>

              <View $gtMd={{ flex: 1, flexBasis: 0 }}>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      color="gray"
                      disabled={!!profile.certified}
                      placeholder="Nom"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </View>
            </View>
            <View $gtMd={{ flexDirection: 'row' }} gap="$4">
              <View $gtMd={{ flex: 1, flexBasis: 0 }}>
                <Controller
                  name="birthdate"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <DatePickerField
                      color="gray"
                      disabled={!!profile.certified}
                      label="Date de naissance"
                      type="date"
                      value={value ?? undefined}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </View>

              <View $gtMd={{ flex: 1, flexBasis: 0 }}>
                <Controller
                  name="nationality"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <NationalitySelect
                      id="nationality"
                      color="gray"
                      value={value ?? 'FR'}
                      placeholder="Nationalité"
                      onBlur={onBlur}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </Fragment>
      )}
    </AbstractProfilForm>
  )
}

export default InformationsForm
