import { ComponentProps, useId } from 'react'
import { CheckboxProps } from 'react-native-paper'
import { Input } from '@/components/bento/inputs/components/inputsParts'
import { Formik } from 'formik'
import { Checkbox, Label, Text, View, YStack } from 'tamagui'
import zod from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const registerFormSchema = zod.object({
  first_name: zod.string().min(1, { message: 'Le prénom ne doit pas être vide' }),
  email: zod.string().email({ message: "L'email n'est pas valide" }),
  postal_code: zod.string().length(5, { message: 'Le code postal doit contenir 5 chiffres' }),
  cgu: zod.boolean().refine((value) => value, { message: 'Vous devez accepter les CGU' }),
  news: zod.boolean(),
})

type VoxInputProps = {
  name: string
  message?: string
  placeholder?: string
  autocomplete?: ComponentProps<typeof Input.Area>['autoComplete']
} & ComponentProps<typeof Input>

export function VoxInput({ name, placeholder, autocomplete, message, ...props }: VoxInputProps) {
  const uniqueId = useId()
  const id = uniqueId + name

  return (
    <View flexDirection="column" justifyContent="center" alignItems="center" gap="$6">
      <Input
        {...props}
        size="$3"
        minWidth="100%"
        $group-window-gtXs={{ minWidth: 150 }}
        {...(message && {
          theme: 'red',
        })}
      >
        <Input.Box>
          <Input.Area autoComplete={autocomplete} id={id} placeholder={placeholder} />
        </Input.Box>
        {message && <Input.Info>{message}</Input.Info>}
      </Input>
    </View>
  )
}

type VoxCheckboxProps = {
  label: string
  error?: string
} & CheckboxProps

const VoxCheckbox = ({ label, id, error, ...props }: VoxCheckboxProps) => {
  const uniqueId = useId()
  return (
    <Checkbox id={id + uniqueId} {...props}>
      <Checkbox.Indicator />
      <Label htmlFor={id + uniqueId}>{label}</Label>
      {error && <Text color="$red">{error}</Text>}
    </Checkbox>
  )
}

type RegisterForm = zod.infer<typeof registerFormSchema>

const initialValues = {
  first_name: '',
  email: '',
  postal_code: '',
  cgu: false,
  news: false,
} satisfies RegisterForm

const EventRegisterForm = () => {
  const onSubmit = (values: RegisterForm) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={toFormikValidationSchema(registerFormSchema)} onSubmit={onSubmit}>
      {({ values, errors, handleChange, handleSubmit }) => (
        <YStack gap="$4">
          <Text fontWeight="$6" fontSize="$3" textAlign="center" color="$textPrimary">
            M’inscrire à cet évènement
          </Text>
          <VoxInput name="first_name" placeholder="Prénom" message={errors.first_name} value={values.first_name} onChange={handleChange} />
          <VoxInput name="email" placeholder="Email" message={errors.email} value={values.email} onChange={handleChange} />
          <VoxInput name="postal_code" placeholder="Code postal" message={errors.postal_code} value={values.postal_code} onChange={handleChange} />
          <VoxCheckbox name="cgu" label="J’accepte les CGU" error={errors.cgu} checked={values.cgu} onChange={handleChange} />
        </YStack>
      )}
    </Formik>
  )
}

export default EventRegisterForm
