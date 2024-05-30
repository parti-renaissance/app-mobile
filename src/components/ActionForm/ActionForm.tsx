import React from 'react'
import ActionTypeEntry from '@/components/ActionForm/Components/ActionTypeEntry'
import AddressAutocomplete from '@/components/AddressAutoComplete/AddressAutocomplete'
import Input from '@/components/base/Input/Input'
import Text from '@/components/base/Text'
import Button from '@/components/Button'
import FormikController from '@/components/FormikController'
import SpacedContainer from '@/components/SpacedContainer/SpacedContainer'
import { ActionType, ActionTypeIcon, ReadableActionType } from '@/data/restObjects/RestActions'
import DatePicker from '@/screens/editPersonalInformation/components/DatePicker'
import { Formik } from 'formik'
import { useMedia, View } from 'tamagui'
import * as z from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const buildError = (start: string) => `${start} est obligatoire.`
const ActionCreateFormSchema = z.object({
  type: z.nativeEnum(ActionType),
  date: z.date().min(new Date(), 'La date ne peut pas être dans le passé.'),
  time: z.date(),
  addressInput: z.string().optional(),
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

interface Props {
  onCancel?: () => void
  onClose?: () => void
}

export default function ActionForm({ onCancel, onClose }: Props) {
  const media = useMedia()

  const webViewPort = media.gtXs

  return (
    <View padding={'$4'} style={{ marginBottom: webViewPort ? 0 : 80 }}>
      <Text fontSize={16} fontWeight={'$6'} mb={'$4'}>
        Je crée une action
      </Text>

      <Text mb={'$4'}>
        Lorem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet consecteturibh lectrem ipsum dolor sit amet consectetur. lorem ipsum dolor sit amet
        consecteturibh le
      </Text>

      <Formik
        initialValues={{
          type: ActionType.PAP,
          date: null,
          time: null,
          addressInput: '',
          address: {
            address: '',
            postal_code: '',
            city_name: '',
            country: '',
          },
          description: '',
        }}
        validateOnChange
        isInitialValid={false}
        onSubmit={(values, formikHelpers) => {
          console.log(values)

          formikHelpers.setSubmitting(false)
          formikHelpers.resetForm()

          onClose?.()
        }}
        validationSchema={toFormikValidationSchema(ActionCreateFormSchema)}
      >
        {({ isValid, setFieldValue, handleSubmit, isSubmitting }) => (
          <View>
            <View mb={'$4'}>
              <Text fontSize={14} fontWeight={'$6'}>
                Catégories d’actions
              </Text>
            </View>

            <View flexDirection={webViewPort ? 'row' : undefined} gap={'$4'} mb={'$4'}>
              <FormikController name={'type'}>
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
                <DatePicker label={'Date'} onChange={(v) => setFieldValue('date', v)} />
              </SpacedContainer>

              <SpacedContainer style={{ flex: 1 }}>
                <DatePicker label={'Heure'} type={'time'} onChange={(v) => setFieldValue('time', v)} />
              </SpacedContainer>
            </View>

            <SpacedContainer>
              <FormikController name={'addressInput'}>
                {({ inputProps, setFieldValue }) => (
                  <AddressAutocomplete setAddressComponents={(val) => setFieldValue('address', val)} defaultValue={inputProps.value} error={inputProps.error} />
                )}
              </FormikController>
            </SpacedContainer>

            <SpacedContainer>
              <Text fontSize={14} fontWeight={'$6'}>
                Description (optionnelle)
              </Text>
            </SpacedContainer>

            <SpacedContainer>
              <FormikController name={'description'}>
                {({ inputProps }) => <Input placeholder={'Ajoutez une description'} multiline numberOfLines={5} {...inputProps} />}
              </FormikController>

              <Text mt={'$2'}>1000 caractères maximum</Text>
            </SpacedContainer>

            <View flexDirection={'row'} justifyContent={'flex-end'} gap={'$4'}>
              <Button variant={'text'} onPress={onCancel}>
                <Button.Text>Annuler</Button.Text>
              </Button>
              <Button disabled={!isValid || isSubmitting} onPress={() => handleSubmit()}>
                <Button.Text>Créer l’action</Button.Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}
