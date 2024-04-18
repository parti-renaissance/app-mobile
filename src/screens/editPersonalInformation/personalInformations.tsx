import React, { forwardRef, useRef } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from '@/components'
import FormikController from '@/components/FormikController'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import Select from '@/components/Select'
import TextField from '@/components/TextField'
import VoxCard from '@/components/VoxCard/VoxCard'
import { ProfileFormError, PublicSubscribeEventFormError } from '@/core/errors'
import { RestDetailedProfileResponse } from '@/data/restObjects/RestDetailedProfileResponse'
import { RestUpdateProfileRequest } from '@/data/restObjects/RestUpdateProfileRequest'
import { useDeleteProfil, useGetDetailProfil, useMutationUpdateProfil } from '@/hooks/useProfil'
import { getCountryCodeForRegionCode, parsePhoneNumber } from 'awesome-phonenumber'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
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
  const genderOptions = [
    { value: Gender.Male, text: 'Homme' },
    {
      value: Gender.Female,
      text: 'Femme',
    },
  ]

  const handleOnSubmit = (values: PersonalInformationsForm) => {
    const payload = {
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
      nationality: values?.nationality,
      ...(values?.birthdate && { birthdate: format(values?.birthdate, 'yyyy-MM-dd') }),
      ...(values?.phoneCountryCode && values?.phoneNumber && { phone: { country: values?.phoneCountryCode, number: values?.phoneNumber } }),
      facebook_page_url: values?.facebook ?? '',
      twitter_page_url: values?.twitter ?? '',
      linkedin_page_url: values?.linkedin ?? '',
      instagram_page_url: values?.instagram ?? '',
      telegram_page_url: values?.telegram ?? '',
    } satisfies RestUpdateProfileRequest

    onSubmit(payload)
  }

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
        address: profile.post_address
          ? {
              address: profile.post_address.address ?? '',
              city: profile.post_address?.city ?? '',
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
      validateOnChange
      validationSchema={toFormikValidationSchema(PersonalInformationsFormSchema)}
      onSubmit={(values) => handleOnSubmit(values)}
    >
      {(formik) => (
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
                  placeholder="exemple@domaine.fr"
                  label="Adresse mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  width="100%"
                  {...inputProps}
                />
              )}
            </FormikController>
          </View>

          <View>
            <Text fontSize="$2" fontWeight="$4">
              Réseaux sociaux
            </Text>

            {[
              { id: 'facebook', placeholder: 'facebook.com/nom-utilisateur', label: 'Facebook' },
              { id: 'telegram', placeholder: 't.me/nom-utilisateur', label: 'Telegram' },
              { id: 'instagram', placeholder: 'instagram.com/nom-utilisateur', label: 'Instagram' },
              { id: 'twitter', placeholder: 'twitter.com/nom-utilisateur', label: 'Twitter' },
              { id: 'linkedin', placeholder: 'linkedin.com/nom-utilisateur', label: 'Linkedin' },
            ].map((item) => (
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

  const { mutateAsync } = useDeleteProfil()

  const onRemoveAccountConfirmed = async () => {
    await mutateAsync()
  }

  const removeAccount = () => {
    AlertUtils.showDestructiveAlert(
      'Suppression du compte',
      'Êtes-vous sûr de vouloir supprimer votre compte ?',
      'Supprimer',
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
      disabled={$updateProfile.isPending}
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

  return (
    <PageLayout.MainSingleColumn>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView
          contentContainerStyle={{
            pt: media.gtSm ? '$8' : undefined,
            pl: media.gtSm ? '$8' : undefined,
            pr: media.gtSm ? '$8' : undefined,
            pb: media.lg ? '$10' : undefined,
          }}
          backgroundColor={!isWeb ? '#fff' : ''}
        >
          <VoxCard>
            <VoxCard.Content>
              <FormEditInformations ref={formikFormRef} profile={profile} onSubmit={handleSubmit} />
              <YStack gap="$10">
                {isWeb && (
                  <View>
                    <ButtonSave width="100%" />
                  </View>
                )}
                <View width={!media?.md ? '50%' : '100%'}>
                  <Button variant="outlined" width="100%" onPress={removeAccount}>
                    <Button.Text>Supprimer mon compte</Button.Text>
                  </Button>
                </View>
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

export default EditInformations
