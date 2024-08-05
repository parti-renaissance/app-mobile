import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button } from '@/components'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Input from '@/components/base/Input/Input'
import Select from '@/components/base/Select/Select'
import Text from '@/components/base/Text'
import CountrySelect from '@/components/CountrySelect/CountrySelect'
import DatePickerField from '@/components/DatePicker'
import NationalitySelect from '@/components/NationalitySelect/NationalitySelect'
import { ProfileFormError } from '@/services/profile/error'
import { useMutationUpdateProfil } from '@/services/profile/hook'
import { RestDetailedProfileResponse } from '@/services/profile/schema'
import isoToEmoji from '@/utils/isoToEmoji'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSupportedRegionCodes } from 'awesome-phonenumber'
import { Controller, useForm } from 'react-hook-form'
import { PortalItem, Spinner, useMedia, View, XStack } from 'tamagui'
import { validateAccountFormSchema } from './schema'

const phoneCodes = getSupportedRegionCodes().map((code) => {
  return {
    value: code,
    label: `${code} ${isoToEmoji(code)}`,
  }
})

const socialPlatforms = [
  { id: 'facebook', placeholder: 'facebook.com/nom-utilisateur', label: 'Facebook', starturl: 'https://facebook.com/' },
  { id: 'telegram', placeholder: 't.me/nom-utilisateur', label: 'Telegram', starturl: 'https://t.me/' },
  { id: 'instagram', placeholder: 'instagram.com/nom-utilisateur', label: 'Instagram', starturl: 'https://instagram.com/' },
  { id: 'twitter', placeholder: 'twitter.com/nom-utilisateur', label: 'Twitter', starturl: 'https://twitter.com/' },
  { id: 'linkedin', placeholder: 'linkedin.com/nom-utilisateur', label: 'Linkedin', starturl: 'https://linkedin.com/in/' },
] as const

export const AccountForm = ({ profile }: { profile: RestDetailedProfileResponse }) => {
  const { control, handleSubmit, formState, reset, setError } = useForm({
    resolver: zodResolver(validateAccountFormSchema),
    defaultValues: profile,
  })

  const media = useMedia()

  const $updateProfile = useMutationUpdateProfil({
    userUuid: profile!.uuid,
  })

  const onSubmit = handleSubmit((data) => {
    $updateProfile
      .mutateAsync(data)
      .then(() => {
        reset(data)
      })
      .catch((e) => {
        if (e instanceof ProfileFormError) {
          e.violations.forEach((violation) => {
            setError(violation.propertyPath, { message: violation.message })
          })
        }
      })
  })

  const [manualAddress, setManualAddress] = useState<boolean>(false)

  useEffect(() => {
    if (formState.errors.post_address) {
      setManualAddress(true)
    }
  }, [formState.errors.post_address])

  const onManualAddressToggle = useCallback(() => {
    setManualAddress((v) => !v)
  }, [])

  const ButtonSave = (props: React.ComponentProps<typeof Button>) => (
    <Button variant="contained" size={'lg'} onPress={onSubmit} {...props}>
      <Button.Text>Enregistrer</Button.Text>
      {$updateProfile.isPending && <Spinner size="small" color="$white1" />}
    </Button>
  )

  return (
    <View gap="$7">
      <Text fontSize="$3" fontWeight="$6">
        Mes informations
      </Text>
      <View gap="$5">
        <Text fontSize="$2" fontWeight="$4">
          Identité{' '}
          {profile?.certified && (
            <Text color="$green7" fontSize={'$1'}>
              (Certifié)
            </Text>
          )}
        </Text>
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
                <Input color="gray" disabled={!!profile.certified} placeholder="Nom" value={value} onBlur={onBlur} onChange={onChange} error={error?.message} />
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
                  placeholder="Date de naissance"
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
              name="nationality"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <NationalitySelect
                  id="nationality"
                  color="gray"
                  value={value}
                  placeholder="Nationalité"
                  onBlur={onBlur}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </View>
        </View>

        <Text fontSize="$2" fontWeight="$4">
          Coordonnées
        </Text>

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
              <View width={110}>
                <Select
                  color="gray"
                  value={value.country}
                  placeholder="Indicatif"
                  options={phoneCodes}
                  onChange={(x) => onChange({ number: value.number, country: x })}
                />
              </View>
              <View flexGrow={1}>
                <Input
                  value={value.number}
                  color="gray"
                  placeholder="Téléphone"
                  onBlur={onBlur}
                  onChange={(x) => onChange({ number: x, country: value.country })}
                  error={error?.message}
                />
              </View>
            </XStack>
          )}
        />

        {manualAddress ? (
          <View gap="$4">
            <Controller
              name="post_address.address"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input color="gray" placeholder="Adresse" value={value ?? undefined} onBlur={onBlur} onChange={onChange} error={error?.message} />
              )}
            />

            <Controller
              name="post_address.city_name"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input color="gray" placeholder="Ville" value={value ?? undefined} onBlur={onBlur} onChange={onChange} error={error?.message} />
              )}
            />

            <Controller
              name="post_address.postal_code"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input color="gray" placeholder="Code postal" value={value ?? undefined} onBlur={onBlur} onChange={onChange} error={error?.message} />
              )}
            />

            <Controller
              name="post_address.country"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <CountrySelect
                  id="country_select"
                  color="gray"
                  value={value ?? undefined}
                  placeholder="Pays"
                  onBlur={onBlur}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </View>
        ) : (
          <Controller
            name="post_address"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <AddressAutocomplete
                color="gray"
                placeholder="Adresse"
                defaultValue={`${value?.address} ${value?.city_name}`}
                onBlur={onBlur}
                setAddressComponents={(x) =>
                  onChange({
                    address: x.address,
                    city_name: x.city,
                    postal_code: x.postalCode,
                    country: x.country,
                  })
                }
                error={error?.message}
              />
            )}
          />
        )}

        <TouchableOpacity onPress={onManualAddressToggle}>
          {manualAddress ? (
            <Text color={'$textSecondary'} textAlign="center" mt={'$4'}>
              <Text color={'$blue6'}>Revenir</Text> à une saisie simplifiée
            </Text>
          ) : (
            <>
              <Text color={'$textSecondary'} textAlign="center">
                Un problème ?
              </Text>
              <Text color={'$textSecondary'} textAlign="center">
                <Text color={'$blue6'}>Cliquez ici</Text> pour saisir manuellement votre adresse.
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text fontSize="$2" fontWeight="$4">
          Réseaux sociaux
        </Text>

        {socialPlatforms.map((platform) => (
          <Controller
            key={platform.id}
            name={`${platform.id}_page_url`}
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                color="gray"
                placeholder={platform.label}
                value={!!value ? value : platform.starturl}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
              />
            )}
          />
        ))}

        {media.gtMd && formState.isDirty && (
          <View>
            <ButtonSave width="100%" />
          </View>
        )}

        {[media.md, formState.isDirty].every(Boolean) ? (
          <PortalItem hostName="ProfilHeaderRight">
            <Button variant="text" size="lg" onPress={onSubmit}>
              <Text fontSize="$2" fontWeight="$6" color="$blue7">
                Enregistrer
              </Text>
              {$updateProfile.isPending && <Spinner size="small" color="$blue7" />}
            </Button>
          </PortalItem>
        ) : null}
      </View>
    </View>
  )
}
