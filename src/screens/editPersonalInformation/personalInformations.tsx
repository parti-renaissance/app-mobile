import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { Button } from '@/components'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import FormikController from '@/components/FormikController'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import Select from '@/components/Select'
import SpacedContainer from '@/components/SpacedContainer/SpacedContainer'
import TextField from '@/components/TextField'
import VoxCard from '@/components/VoxCard/VoxCard'
import clientEnv from '@/config/clientEnv'
import { ProfileFormError } from '@/core/errors'
import { useSession } from '@/ctx/SessionProvider'
import { RestDetailedProfileResponse } from '@/data/restObjects/RestDetailedProfileResponse'
import { RestUpdateProfileRequest } from '@/data/restObjects/RestUpdateProfileRequest'
import { useDeleteProfil, useGetDetailProfil, useMutationUpdateProfil } from '@/hooks/useProfil'
import { AddressFormatter } from '@/utils/AddressFormatter'
import { format } from 'date-fns'
import * as WebBrowser from 'expo-web-browser'
import { Formik, FormikProps } from 'formik'
import { isWeb, ScrollView, Spinner, Stack, Text, useMedia, View, YStack } from 'tamagui'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { AlertUtils } from '../shared/AlertUtils'
import { Gender, PersonalInformationsForm } from './types'
import { capitalizeFirstLetter } from './utils'
import { PersonalInformationsFormSchema } from './validation'

type FormEditInformationsProps = {
  onSubmit: (x: RestUpdateProfileRequest) => void
  profile: RestDetailedProfileResponse
}

const FormEditInformations = forwardRef<FormikProps<PersonalInformationsForm>, FormEditInformationsProps>(({ profile, onSubmit }, ref) => {
  const [manualAddress, setManualAddress] = useState<boolean>(false)

  const handleOnSubmit = useCallback((values: PersonalInformationsForm) => {
    const payload: RestUpdateProfileRequest = {
      address: {
        address: values.address?.address ?? '',
        postal_code: values.address?.postalCode ?? '',
        city_name: values.address?.city ?? '',
        country: values.address?.country ?? '',
      },
      phone: values?.phoneNumber ? { country: values?.phoneCountryCode, number: values?.phoneNumber } : null,
      gender: values?.gender.toLowerCase(),
      custom_gender: values?.customGender ?? null,
      first_name: values?.firstName,
      last_name: values?.lastName,
      email_address: values?.email,
      nationality: values?.nationality ?? '',
      ...(values?.birthdate && { birthdate: format(values?.birthdate, 'yyyy-MM-dd') }),
      ...(values?.phoneCountryCode && values?.phoneNumber && { phone: { country: values?.phoneCountryCode, number: values?.phoneNumber } }),
      facebook_page_url: values?.facebook ?? '',
      twitter_page_url: values?.twitter ?? '',
      linkedin_page_url: values?.linkedin ?? '',
      instagram_page_url: values?.instagram ?? '',
      telegram_page_url: values?.telegram ?? '',
    }

    onSubmit(payload)
  }, [])

  const onManualAddressToggle = useCallback(() => {
    setManualAddress((v) => !v)
  }, [manualAddress])

  return (
    <Formik<PersonalInformationsForm>
      innerRef={ref}
      initialValues={{
        firstName: profile?.first_name ?? '',
        lastName: profile?.last_name ?? '',
        gender: Gender[capitalizeFirstLetter(profile?.gender)],
        customGender: profile?.custom_gender ?? '',
        nationality: profile?.nationality ?? '',
        birthdate: new Date(profile?.birthdate),
        addressInput: profile.post_address !== null ? AddressFormatter.formatProfileFormatAddress(profile.post_address) : '',
        address: profile.post_address
          ? {
              address: profile.post_address.address ?? '',
              city: profile.post_address?.city_name ?? '',
              postalCode: profile.post_address?.postal_code ?? '',
              country: profile?.post_address?.country ?? '',
            }
          : { address: '', city: '', postalCode: '', country: '' },
        email: profile?.email_address ?? '',
        phoneNumber: profile?.phone?.number ?? '',
        phoneCountryCode: profile?.phone?.country ?? 'FR',
        facebook: profile?.facebook_page_url ?? '',
        twitter: profile?.twitter_page_url ?? '',
        linkedin: profile?.linkedin_page_url ?? '',
        instagram: profile?.instagram_page_url ?? '',
        telegram: profile?.telegram_page_url ?? '',
      }}
      validateOnBlur
      validationSchema={toFormikValidationSchema(PersonalInformationsFormSchema)}
      onSubmit={handleOnSubmit}
    >
      {() => (
        <View gap="$7">
          <Text fontSize="$3" fontWeight="$6">
            Mes informations
          </Text>

          <View>
            <Text fontSize="$2" fontWeight="$4">
              Identité
            </Text>

            <FormikController<PersonalInformationsForm> name="gender">
              {({ inputProps: { onChange, value } }) => (
                <Select
                  id="gender"
                  label={'Civilité'}
                  onValueChange={onChange}
                  placeholder="Sélectionner votre civilité"
                  options={genderOptions}
                  value={value}
                />
              )}
            </FormikController>

            <YStack $gtLg={{ gap: '$6', flexDirection: 'row' }}>
              <View flex={1}>
                <FormikController name="firstName">
                  {({ inputProps }) => <TextField placeholder="Prénom" label="Prénom" width="100%" {...inputProps} />}
                </FormikController>
              </View>

              <View flex={1}>
                <FormikController name="lastName">
                  {({ inputProps }) => <TextField placeholder="Nom" label="Nom" width="100%" {...inputProps} />}
                </FormikController>
              </View>
            </YStack>
          </View>

          <View>
            <Text fontSize="$2" fontWeight="$4">
              Coordonnées
            </Text>

            <FormikController name="email">
              {({ inputProps }) => (
                <TextField
                  disabled
                  placeholder="exemple@domaine.fr"
                  label="Adresse mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  width="100%"
                  {...inputProps}
                />
              )}
            </FormikController>

            {manualAddress ? (
              <>
                <FormikController name="address.address">
                  {({ inputProps }) => <TextField placeholder="Adresse" label="Adresse" width="100%" {...inputProps} />}
                </FormikController>

                <FormikController name="address.postalCode">
                  {({ inputProps }) => <TextField placeholder="Code postal" label="Code postal" width="100%" {...inputProps} />}
                </FormikController>

                <FormikController name="address.city">
                  {({ inputProps }) => <TextField placeholder="Ville" label="Ville" width="100%" {...inputProps} />}
                </FormikController>
              </>
            ) : (
              <SpacedContainer>
                <FormikController name={'addressInput'}>
                  {({ inputProps, setFieldValue }) => (
                    <AddressAutocomplete
                      setAddressComponents={(val) => setFieldValue('address', val)}
                      setStringValue={inputProps.onChange}
                      defaultValue={inputProps.value}
                      onBlur={inputProps.onBlur}
                      error={inputProps.error}
                    />
                  )}
                </FormikController>
              </SpacedContainer>
            )}

            <SpacedContainer>
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
            </SpacedContainer>
          </View>

          <View>
            <Text fontSize="$2" fontWeight="$4">
              Réseaux sociaux
            </Text>

            {socialPlatforms.map((item) => (
              <View key={item.id} width="100%">
                <FormikController name={item.id}>
                  {({ inputProps }) => <TextField placeholder={item.placeholder} label={item.label} width="100%" {...inputProps} />}
                </FormikController>
              </View>
            ))}
          </View>
        </View>
      )}
    </Formik>
  )
})

const EditInformations = () => {
  const media = useMedia()
  const formikFormRef = useRef<FormikProps<PersonalInformationsForm>>(null)
  const { data: profile } = useGetDetailProfil()
  const $updateProfile = useMutationUpdateProfil({
    userUuid: profile?.uuid,
  })
  const { signOut } = useSession()

  const { mutateAsync } = useDeleteProfil()

  const onRemoveAccountConfirmed = async () => {
    if (!profile.adherent) return mutateAsync()
    const ACCOUNT_ROUTE_RE = `https://${clientEnv.APP_RENAISSANCE_HOST}/parametres/mon-compte`
    if (isWeb && window) {
      window.location.href = ACCOUNT_ROUTE_RE
    } else {
      await WebBrowser.openAuthSessionAsync(ACCOUNT_ROUTE_RE, null, { createTask: false })
    }
  }

  const removeAccount = () => {
    AlertUtils.showDestructiveAlert(
      profile.adherent ? 'Désadhérer' : 'Suppression du compte',
      profile.adherent ? 'Êtes-vous sûr de vouloir désadhérer ?' : 'Êtes-vous sûr de vouloir supprimer votre compte ?',
      profile.adherent ? 'Désadhérer' : 'Supprimer',
      'Annuler',
      onRemoveAccountConfirmed,
    )
  }

  const handleSubmit = async (values: RestUpdateProfileRequest) => {
    await $updateProfile.mutateAsync(values).catch((error) => {
      if (error instanceof ProfileFormError) {
        error.violations.forEach((violation) => {
          const valuesKeys = Object.keys(formikFormRef.current?.values ?? {}).map((key) => key.split(/(?=[A-Z])/)[0])
          if (violation.propertyPath === '') {
            return
          }
          const field = valuesKeys.find((key) => violation.propertyPath.startsWith(key))
          if (field) {
            formikFormRef.current?.setFieldError(field, violation.message)
          }
        })
      }
    })
  }

  const ButtonSave = (props: React.ComponentProps<typeof Button>) => (
    <Button
      variant="contained"
      size={media?.md ? 'lg' : 'md'}
      onPress={() => {
        formikFormRef.current?.handleSubmit()
      }}
      {...props}
    >
      <Button.Text>Enregistrer</Button.Text>
      {$updateProfile.isPending && <Spinner size="small" color="$white1" />}
    </Button>
  )

  const scrollViewContainerStyle = useMemo(
    () => ({
      pt: media.gtSm ? '$8' : undefined,
      pl: media.gtSm ? '$8' : undefined,
      pr: media.gtSm ? '$8' : undefined,
      pb: isWeb ? '$10' : '$12',
    }),
    [media],
  )

  return (
    <PageLayout.MainSingleColumn>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={scrollViewContainerStyle} backgroundColor={!isWeb ? '#fff' : ''}>
          <VoxCard>
            <VoxCard.Content>
              <FormEditInformations ref={formikFormRef} profile={profile} onSubmit={handleSubmit} />
              <YStack gap="$10">
                {isWeb && (
                  <View>
                    <ButtonSave width="100%" />
                  </View>
                )}
                <Button variant="outlined" width="100%" onPress={signOut}>
                  <Button.Text>Se déconnecter</Button.Text>
                </Button>
                <Button variant="outlined" width="100%" onPress={removeAccount}>
                  <Button.Text>{profile.adherent ? 'Désadhérer' : 'Supprimer mon compte'}</Button.Text>
                </Button>
              </YStack>
            </VoxCard.Content>
          </VoxCard>
        </ScrollView>

        {!isWeb && media.lg && (
          <Stack position="absolute" bottom="$3" $sm={{ left: '$4', right: '$4' }} $lg={{ left: '$10', right: '$10' }}>
            <ButtonSave width="100%" />
          </Stack>
        )}
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

const genderOptions = [
  { value: Gender.Male, text: 'Monsieur' },
  {
    value: Gender.Female,
    text: 'Madame',
  },
]

const socialPlatforms = [
  { id: 'facebook', placeholder: 'facebook.com/nom-utilisateur', label: 'Facebook' },
  { id: 'telegram', placeholder: 't.me/nom-utilisateur', label: 'Telegram' },
  { id: 'instagram', placeholder: 'instagram.com/nom-utilisateur', label: 'Instagram' },
  { id: 'twitter', placeholder: 'twitter.com/nom-utilisateur', label: 'Twitter' },
  { id: 'linkedin', placeholder: 'linkedin.com/nom-utilisateur', label: 'Linkedin' },
]

export default EditInformations
