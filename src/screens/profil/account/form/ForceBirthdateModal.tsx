import { Fragment } from 'react'
import DatePickerField from '@/components/DatePicker'
import { VoxHeader } from '@/components/Header/Header'
import { MessageCard } from '@/components/MessageCard/MessageCard'
import ModalOrPageBase from '@/components/ModalOrPageBase/ModalOrPageBase'
import { useGetDetailProfil } from '@/services/profile/hook'
import { Info } from '@tamagui/lucide-icons'
import { Controller } from 'react-hook-form'
import { View } from 'tamagui'
import * as z from 'zod'
import AbstractProfilForm from './AbstractProfilForm'
import { validateBirthdateFormSchema } from './schema'

const ForceBirthdateModal = () => {
  const { data: profile } = useGetDetailProfil()
  return (
    <ModalOrPageBase open={!Boolean(profile.birthdate)} header={<VoxHeader.ModalFrame />}>
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
            <MessageCard theme="yellow" iconLeft={Info}>
              Pour accéder à votre profil, veuillez renseigner votre date de naissance.
            </MessageCard>

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
