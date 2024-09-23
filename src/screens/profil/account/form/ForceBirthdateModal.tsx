import { Fragment } from 'react'
import Text from '@/components/base/Text'
import DatePickerField from '@/components/DatePicker'
import ModalOrPageBase from '@/components/ModalOrPageBase/ModalOrPageBase'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RestDetailedProfileResponse } from '@/services/profile/schema'
import { Info } from '@tamagui/lucide-icons'
import { Controller } from 'react-hook-form'
import { View, XStack } from 'tamagui'
import * as z from 'zod'
import AbstractProfilForm from './AbstractProfilForm'
import { validateBirthdateFormSchema } from './schema'

const ForceBirthdateModal = ({ profile }: { profile: RestDetailedProfileResponse }) => {
  return (
    <ModalOrPageBase open={!Boolean(profile.birthdate)} header={<XStack />}>
      <AbstractProfilForm
        uuid={profile.uuid}
        defaultValues={
          {
            birthdate: profile.birthdate,
          } as const
        }
        validatorSchema={z.object({
          birthdate: validateBirthdateFormSchema,
        })}
      >
        {({ control }) => (
          <Fragment>
            <VoxCard inside bg="$yellow1">
              <VoxCard.Content>
                <XStack gap={16} alignItems="center">
                  <Info size={24} color="yellow7" />
                  <Text.MD multiline color="$yellow7" semibold>
                    Pour accéder à votre profil, veuillez renseigner votre date de naissance.
                  </Text.MD>
                </XStack>
              </VoxCard.Content>
            </VoxCard>
            <View $gtMd={{ flexDirection: 'row' }} gap="$4">
              <View $gtMd={{ flex: 1, flexBasis: 0 }}>
                <Controller
                  name="birthdate"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <DatePickerField
                      color="gray"
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
            </View>
          </Fragment>
        )}
      </AbstractProfilForm>
    </ModalOrPageBase>
  )
}

export default ForceBirthdateModal
