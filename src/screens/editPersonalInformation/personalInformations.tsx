import React, { useRef } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from '@/components'
import { DatePickerBody } from '@/components/Bento/Datepickers'
import { DatePicker } from '@/components/Bento/Datepickers/common/dateParts'
import { RegionSelectBox } from '@/components/Bento/PhoneInput/PhoneInput'
import FormikController from '@/components/FormikController'
import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import Select from '@/components/Select'
import TextField from '@/components/TextField'
import VoxCard from '@/components/VoxCard/VoxCard'
import { RemoveAccountInteractor } from '@/core/interactor/RemoveAccountInteractor'
import { useGetDetailProfil, useMutationUpdateProfil } from '@/hooks/useProfil'
import { AlertCircle } from '@tamagui/lucide-icons'
import { getCountryCodeForRegionCode } from 'awesome-phonenumber'
import { format } from 'date-fns'
import { Formik, FormikProps } from 'formik'
import { isWeb, Label, ScrollView, Separator, Stack, Text, useMedia, View } from 'tamagui'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { AlertUtils } from '../shared/AlertUtils'
import { Gender, PersonalInformationsForm } from './types'
import { capitalizeFirstLetter } from './utils'
import { PersonalInformationsFormSchema } from './validation'

const FormEditInformations = ({ formikFormRef }: { formikFormRef: React.RefObject<FormikProps<PersonalInformationsForm>> }) => {
  const media = useMedia()
  const [manualAddress, setManualAddress] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const { data: profile } = useGetDetailProfil()

  const { mutate: updateProfile } = useMutationUpdateProfil({
    userUuid: profile?.uuid,
  })

  const nationalities = [
    { value: 'FR', text: 'Française' },
    { value: 'EN', text: 'Anglaise' },
    { value: 'DE', text: 'Allemande' },
    { value: 'ES', text: 'Espagnole' },
    { value: 'IT', text: 'Italienne' },
    { value: 'PT', text: 'Portugaise' },
    { value: 'BE', text: 'Belge' },
    { value: 'NL', text: 'Néerlandaise' },
    { value: 'LU', text: 'Luxembourgeoise' },
    { value: 'CH', text: 'Suisse' },
    { value: 'CA', text: 'Canadienne' },
    { value: 'US', text: 'Américaine' },
    { value: 'AU', text: 'Australienne' },
  ]

  const genderOptions = [
    { value: Gender.Male, text: 'Homme' },
    {
      value: Gender.Female,
      text: 'Femme',
    },
    {
      value: Gender.Other,
      text: 'Autre',
    },
  ]

  const handleOnSubmit = (values: PersonalInformationsForm) => {
    const payload = {
      ...(values?.address && {
        address: {
          ...(values.address?.address && { address: values.address?.address }),
          ...(values.address?.postalCode && { postal_code: values.address?.postalCode }),
          ...(values.address?.city && { city_name: values.address?.city }),
          ...(values.address?.country && { country: values.address?.country }),
        },
      }),
      gender: values?.gender.toLowerCase(),
      custom_gender: values?.customGender,
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
    }

    updateProfile(payload)
  }

  return (
    <Formik<PersonalInformationsForm>
      innerRef={formikFormRef}
      initialValues={
        {
          firstName: profile?.first_name ?? '',
          lastName: profile?.last_name ?? '',
          gender: Gender[capitalizeFirstLetter(profile?.gender)],
          customGender: profile?.custom_gender ?? '',
          nationality: profile?.nationality ?? '',
          birthdate: new Date(profile?.birthdate ?? ''),
          address: {
            address: profile.post_address.address ?? '',
            city: profile.post_address?.city ?? '',
            postalCode: profile.post_address?.postal_code ?? '',
            country: profile?.post_address?.country ?? '',
          },
          email: profile?.email_address ?? '',
          phoneNumber: profile?.phone?.number ?? '',
          phoneCountryCode: profile?.phone?.country ?? 'FR',
          facebook: profile?.facebook_page_url ?? '',
          twitter: profile?.twitter_page_url ?? '',
          linkedin: profile?.linkedin_page_url ?? '',
          instagram: profile?.instagram_page_url ?? '',
          telegram: profile?.telegram_page_url ?? '',
        } as PersonalInformationsForm & { setSubmitting: boolean }
      }
      validateOnBlur
      validateOnChange
      validationSchema={toFormikValidationSchema(PersonalInformationsFormSchema)}
      onSubmit={(values) => handleOnSubmit(values)}
    >
      {(formik) => (
        <View gap="$6">
          <Text fontSize="$3" fontWeight="$6">
            Mes informations
          </Text>

          <View>
            <Text fontSize="$2" fontWeight="$4">
              Identité
            </Text>
            <FormikController<PersonalInformationsForm> name="gender">
              {({ onChangeText, value }) => (
                <Select
                  id="gender"
                  label={'Civilité'}
                  onValueChange={onChangeText}
                  placeholder="Sélectionner votre civilité"
                  options={genderOptions}
                  value={value}
                />
              )}
            </FormikController>

            <View gap={!media.md ? '$6' : 'unset'} flexDirection={!media.md ? 'row' : 'column'}>
              <View flex={1} flexBasis={0}>
                <FormikController name="firstName">{(props) => <TextField placeholder="Prénom" label="Prénom" width="100%" {...props} />}</FormikController>
              </View>

              <View flex={1} flexBasis={0}>
                <FormikController name="lastName">{(props) => <TextField placeholder="Nom" label="Nom" width="100%" {...props} />}</FormikController>
              </View>
            </View>

            <View gap={!media.md ? '$6' : 'unset'} flexDirection={!media.md ? 'row' : 'column'}>
              <View flex={1} flexBasis={0}>
                <FormikController name="birthdate">
                  {({ onChange, value, error, errorMessage }) => (
                    <DatePicker
                      open={open}
                      onOpenChange={setOpen}
                      config={{
                        selectedDates: value ? [value] : [],
                        onDatesChange: (d: Date[]) => {
                          onChange(d[0])
                          setOpen(false)
                        },
                        dates: {
                          maxDate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
                        },
                      }}
                    >
                      <DatePicker.Trigger asChild>
                        <TextField
                          id="birthdate"
                          label="Date de naissance"
                          placeholder="JJ/MM/AAAA"
                          value={value ? format(value, 'dd/MM/yyyy') : ''}
                          onBlur={() => {
                            setOpen(true)
                          }}
                          error={error}
                          errorMessage={errorMessage}
                        />
                      </DatePicker.Trigger>
                      <DatePicker.Content>
                        <DatePicker.Content.Arrow />
                        <DatePickerBody order={['year', 'month', 'day']} />
                      </DatePicker.Content>
                    </DatePicker>
                  )}
                </FormikController>
              </View>

              <View flex={1} flexBasis={0}>
                <FormikController name="nationality">
                  {({ onChange, value, touched, errorMessage }) => (
                    <>
                      <Select id="nationality" placeholder="Française" label="Nationalité" value={value} onValueChange={onChange} options={nationalities} />
                      {touched && errorMessage && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} gap={4}>
                          <AlertCircle size={16} color="$red6" />
                          <Text color="$gray6" fontSize="$1">
                            {errorMessage}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </FormikController>
              </View>
            </View>
          </View>

          {media.md && <Separator alignSelf="stretch" />}

          <View>
            <Text fontSize="$2" fontWeight="$4">
              Coordonnées
            </Text>

            <FormikController name="email">
              {(props) => (
                <TextField
                  id="email"
                  placeholder="exemple@domaine.fr"
                  label="Adresse mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  width="100%"
                  {...props}
                />
              )}
            </FormikController>
            <View gap="$6" style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View width="20%">
                <Label
                  color="$gray5"
                  fontWeight="600"
                  fontFamily="$PublicSans"
                  fontSize="$1"
                  ml="$1"
                  mb="$-4"
                  pressStyle={{
                    color: '$gray5',
                  }}
                >
                  Indicatif
                </Label>

                <FormikController name="phoneCountryCode">
                  {({ onChange, value }) => (
                    <RegionSelectBox
                      regionCode={value}
                      setRegionCode={(regionCode) => {
                        onChange(regionCode)
                        formik.setFieldValue('phoneNumber', `+${getCountryCodeForRegionCode(formik.values.phoneCountryCode)}`)
                      }}
                    />
                  )}
                </FormikController>
              </View>

              <View width="80%">
                <FormikController name="phoneNumber">
                  {(props) => (
                    <TextField
                      id="phoneNumber"
                      label="Numéro de téléphone"
                      keyboardType="phone-pad"
                      placeholder={`+${getCountryCodeForRegionCode(formik.values.phoneCountryCode)}`}
                      width="100%"
                      {...props}
                    />
                  )}
                </FormikController>
              </View>
            </View>

            <View gap="$6">
              <FormikController name="address.address">
                {(props) => (
                  <TextField
                    id="address"
                    label={manualAddress ? 'Rue' : 'Adresse'}
                    placeholder={manualAddress ? '1 rue de la Paix' : '1 rue de la Paix, 75000 Paris'}
                    {...props}
                  />
                )}
              </FormikController>

              {manualAddress && (
                <View gap="$6" style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <View style={{ width: '50%' }}>
                    <FormikController name="address.city">
                      {(props) => <TextField id="city" placeholder="Paris" label="Ville" width="100%" {...props} />}
                    </FormikController>
                  </View>

                  <View style={{ width: '50%' }}>
                    <FormikController name="address.postalCode">
                      {(props) => <TextField id="postalCode" placeholder="75000" label="Code postal" width="100%" {...props} />}
                    </FormikController>
                  </View>
                </View>
              )}
              {!manualAddress && (
                <View
                  alignContent="center"
                  gap={6}
                  justifyContent="center"
                  alignItems="center"
                  borderStyle="dashed"
                  borderWidth="$0.5"
                  borderRadius="$2"
                  borderColor="$gray3"
                  padding="$4"
                >
                  <Text color="$gray6">Un problème ?</Text>

                  <View style={{ flexDirection: 'row' }}>
                    <Text color="$gray6">
                      <Text color="$blue5" onPress={() => setManualAddress(true)}>
                        Cliquez-ici !
                      </Text>{' '}
                      pour saisir manuellement votre adresse.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <Separator alignSelf="stretch" />

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
                  {(props) => <TextField placeholder={item.placeholder} label={item.label} width="100%" {...props} />}
                </FormikController>
              </View>
            ))}
          </View>
        </View>
      )}
    </Formik>
  )
}

const EditInformations = () => {
  const media = useMedia()
  const formikFormRef = useRef<FormikProps<PersonalInformationsForm>>(null)

  const onRemoveAccountConfirmed = async () => {
    await new RemoveAccountInteractor().execute().catch((error) => AlertUtils.showNetworkAlert(error, onRemoveAccountConfirmed))
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

  const ButtonSave = (props) => (
    <Button type="submit" variant="contained" size={media?.md ? 'lg' : 'md'} onPress={() => formikFormRef.current?.submitForm()} {...props}>
      <Button.Text>Enregistrer</Button.Text>
    </Button>
  )

  return (
    <PageLayout.MainSingleColumn>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView paddingHorizontal={isWeb ? '$4' : 'unset'} contentContainerStyle={{ paddingVertical: '$8' }} backgroundColor={!isWeb ? '#fff' : ''}>
          <VoxCard>
            <VoxCard.Content>
              <FormEditInformations formikFormRef={formikFormRef} />

              <Stack flexDirection="row" gap="$3" justifyContent="space-between">
                <View width={!media?.md ? '50%' : '100%'}>
                  <Button variant="outlined" size={media?.md ? 'lg' : 'md'} width={!media?.md ? 'none' : '100%'} onPress={removeAccount}>
                    <Button.Text>Supprimer mon compte</Button.Text>
                  </Button>
                </View>

                {media.lg && isWeb && (
                  <View>
                    <ButtonSave />
                  </View>
                )}
              </Stack>
            </VoxCard.Content>
          </VoxCard>
        </ScrollView>

        {media.lg && !isWeb && (
          <Stack position="absolute" bottom="$3" $sm={{ left: '$4', right: '$4' }} $lg={{ left: '$10', right: '$10' }}>
            <ButtonSave width="100%" />
          </Stack>
        )}
      </KeyboardAvoidingView>
    </PageLayout.MainSingleColumn>
  )
}

export default EditInformations
