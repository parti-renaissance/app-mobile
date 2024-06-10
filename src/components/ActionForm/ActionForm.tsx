import React from 'react'
import ActionTypeEntry from '@/components/ActionForm/Components/ActionTypeEntry'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Input from '@/components/base/Input/Input'
import Text from '@/components/base/Text'
import Button from '@/components/Button'
import FormikController from '@/components/FormikController'
import SpacedContainer from '@/components/SpacedContainer/SpacedContainer'
import { useSession } from '@/ctx/SessionProvider'
import { ActionType, ActionTypeIcon, isFullAction, ReadableActionType } from '@/data/restObjects/RestActions'
import { useAction } from '@/hooks/useActions/useActions'
import useCreateOrEditAction from '@/hooks/useActions/useCreateOrEditAction'
import DatePicker from '@/screens/editPersonalInformation/components/DatePicker'
import { captureException } from '@sentry/core'
import { addHours, formatDate } from 'date-fns'
import { Formik } from 'formik'
import { Spinner, useMedia, View } from 'tamagui'
import * as z from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const buildError = (start: string) => `${start} est obligatoire.`
const ActionCreateFormSchema = z.object({
  type: z.nativeEnum(ActionType),
  date: z.date().min(new Date(), 'La date ne peut pas être dans le passé.'),
  time: z.date(),
  addressInput: z.string({
    required_error: buildError('L’adresse'),
  }),
  address: z.object({
    address: z.string({
      required_error: buildError('L’adresse'),
    }),
    city: z.string({
      required_error: buildError('La ville'),
    }),
    postalCode: z.string({
      required_error: buildError('Le code postal'),
    }),
    country: z.string({
      required_error: buildError('Le pays'),
    }),
  }),
  description: z.string().max(1000).optional(),
})

type ActionCreateForm = z.infer<typeof ActionCreateFormSchema>
interface Props {
  onCancel?: () => void
  onClose?: () => void
  uuid?: string
}

export default function ActionForm({ onCancel, onClose, uuid }: Props) {
  const media = useMedia()
  const webViewPort = media.gtXs
  const { scope } = useSession()
  const myScope = scope?.data?.find((x) => x.features.includes('actions'))
  const { data } = useAction(uuid)
  console.log(scope, 'scope')

  const { mutateAsync, isPending } = useCreateOrEditAction({
    uuid,
    scope: myScope?.code,
  })

  if ((!data || !isFullAction(data)) && uuid) return null

  // @todo fetch data here if uuid is defined
  const item = {
    type: data?.type ?? ActionType.PAP,
    date: data?.date ?? addHours(new Date(), 1),
    time: data?.date ?? addHours(new Date(), 1),
    addressInput: data?.post_address ? `${data.post_address.address}  ${data.post_address.city_name}` : '',
    address: {
      address: data?.post_address?.address ?? '',
      city: data?.post_address?.city_name ?? '',
      location: {
        lat: data?.post_address?.latitude ?? 0,
        lng: data?.post_address?.longitude ?? 0,
      },
      postalCode: data?.post_address?.postal_code ?? '',
      country: data?.post_address?.country ?? '',
    },
    description: data && isFullAction(data) ? data?.description : '',
  }

  return (
    <View padding={'$4'} style={{ marginBottom: webViewPort ? 0 : 80 }}>
      <Text fontSize={16} fontWeight={'$6'} mb={'$4'}>
        {uuid ? 'Je modifie une action' : 'Je crée une action'}
      </Text>

      <Text mb={'$4'}>
        Lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consecteturibh lectrem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet
        consecteturibh le
      </Text>

      <Formik
        initialValues={item as ActionCreateForm}
        validateOnChange
        validateOnMount
        onSubmit={async (values, formikHelpers) => {
          console.log('values', values)
          const day = formatDate(values.date, 'yyyy-MM-dd')
          const time = formatDate(values.time, "HH:mm:ss.SSS'Z")
          const dateTime = new Date(`${day}T${time}`)
          try {
            await mutateAsync({
              type: values.type,
              date: dateTime,
              description: values.description ?? '',
              post_address: {
                address: values.address.address,
                postal_code: values.address.postalCode,
                city_name: values.address.city,
                country: values.address.country,
              },
            })
            formikHelpers.resetForm()
            onClose?.()
          } catch (e) {
            captureException(e)
          }

          formikHelpers.setSubmitting(false)
        }}
        validationSchema={toFormikValidationSchema(ActionCreateFormSchema)}
      >
        {({ handleSubmit, isSubmitting }) => (
          <View>
            <View mb={'$4'}>
              <Text fontSize={14} fontWeight={'$6'}>
                Catégories d’actions
              </Text>
            </View>

            <View flexDirection={webViewPort ? 'row' : undefined} gap={'$4'} mb={'$4'}>
              <FormikController<ActionCreateForm, 'type'> name={'type'}>
                {({ inputProps }) => (
                  <>
                    {Object.values(ActionType).map((el) => (
                      <View key={`${el}`} flex={webViewPort ? 1 : undefined} width={webViewPort ? '100%' : undefined}>
                        <ActionTypeEntry
                          label={ReadableActionType[el]}
                          Icon={ActionTypeIcon[el]}
                          description={'lorem ipsum dolor sit amet'}
                          selected={inputProps.value === el}
                          onPress={() => inputProps.onChange(el)}
                        />
                      </View>
                    ))}
                  </>
                )}
              </FormikController>
            </View>

            <SpacedContainer>
              <Text fontSize={14} fontWeight={'$6'}>
                Fixez un rendez-vous
              </Text>
            </SpacedContainer>

            <View flexDirection={webViewPort ? 'row' : undefined} gap={webViewPort ? '$4' : undefined}>
              <SpacedContainer style={{ flex: 1 }}>
                <FormikController<ActionCreateForm, 'date'> name={'date'}>
                  {({ setFieldValue, inputProps }) => (
                    <DatePicker
                      label={'Date'}
                      error={inputProps.error}
                      errorMessage={inputProps.error}
                      onBlur={inputProps.onBlur}
                      value={inputProps.value}
                      onChange={setFieldValue('date', true)}
                    />
                  )}
                </FormikController>
              </SpacedContainer>

              <SpacedContainer style={{ flex: 1 }}>
                <FormikController<ActionCreateForm, 'time'> name={'time'}>
                  {({ setFieldValue, inputProps }) => (
                    <DatePicker
                      label={'Heure'}
                      error={inputProps.error}
                      errorMessage={inputProps.error}
                      onBlur={inputProps.onBlur}
                      value={inputProps.value}
                      type={'time'}
                      onChange={setFieldValue('time', true)}
                    />
                  )}
                </FormikController>
              </SpacedContainer>
            </View>

            <SpacedContainer>
              <FormikController<ActionCreateForm, 'addressInput'> name={'addressInput'}>
                {({ inputProps, setFieldValue }) => (
                  <AddressAutocomplete
                    setAddressComponents={(val) => {
                      if (!val) return
                      inputProps.onChange(val.address)
                      setFieldValue('address', true)(val)
                    }}
                    onBlur={inputProps.onBlur}
                    defaultValue={inputProps.value}
                    error={inputProps.error}
                  />
                )}
              </FormikController>
            </SpacedContainer>

            <SpacedContainer>
              <Text fontSize={14} fontWeight={'$6'}>
                Description (optionnelle)
              </Text>
            </SpacedContainer>

            <SpacedContainer>
              <FormikController<ActionCreateForm, 'description'> name={'description'}>
                {({ inputProps }) => (
                  <Input
                    placeholder={'Ajoutez une description'}
                    multiline
                    numberOfLines={5}
                    {...inputProps}
                    onChange={undefined}
                    onChangeText={(x) => inputProps.onChange(x)}
                  />
                )}
              </FormikController>

              <Text mt={'$2'}>1000 caractères maximum</Text>
            </SpacedContainer>

            <View flexDirection={'row'} justifyContent={'flex-end'} gap={'$4'}>
              <Button variant={'text'} onPress={onCancel}>
                <Button.Text>Annuler</Button.Text>
              </Button>
              <Button disabled={isSubmitting || isPending} onPress={() => handleSubmit()}>
                {isPending ? <Spinner color="$white1" /> : <Button.Text>{uuid ? 'Modifier l’action' : 'Créer l’action'}</Button.Text>}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}
