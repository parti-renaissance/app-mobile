import React from 'react'
import { VoxButton } from '@/components/Button'
import VoxCard from '@/components/VoxCard/VoxCard'
import { ProfileFormError } from '@/services/profile/error'
import { useMutationUpdateProfil } from '@/services/profile/hook'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { zodResolver } from '@hookform/resolvers/zod'
import { has } from 'lodash'
import { Control, DefaultValues, FieldValues, FormState, Path, useForm } from 'react-hook-form'
import { XStack } from 'tamagui'
import * as z from 'zod'

const isPathExist = <TF extends FieldValues, S extends string>(path: S, obj: DefaultValues<TF>): path is Path<TF> => {
  return has(obj, path)
}

const AbstractForm = <T extends z.Schema<any, any>, TF extends FieldValues>(
  props: {
    defaultValues: DefaultValues<TF>
    uuid: string
    validatorSchema: T
    onErrors?: (errors: FormState<TF>['errors']) => void
    children: (props: { control: Control<TF>; formState: FormState<TF> }) => React.ReactNode
  } & { cardProps?: React.ComponentProps<typeof VoxCard> },
) => {
  const { control, handleSubmit, formState, reset, setError } = useForm({
    resolver: zodResolver(props.validatorSchema),
    defaultValues: props.defaultValues,
    mode: 'all',
  })

  React.useEffect(() => {
    if (props.onErrors) {
      props.onErrors(formState.errors)
    }
  }, [formState.errors])

  const { mutateAsync, isPending } = useMutationUpdateProfil({ userUuid: props.uuid })

  const onSubmit = handleSubmit((data) => {
    mutateAsync(data)
      .then(() => {
        reset()
      })
      .catch((e) => {
        if (e instanceof ProfileFormError) {
          e.violations.forEach((violation) => {
            if (isPathExist(violation.propertyPath, props.defaultValues)) {
              setError(violation.propertyPath, { message: violation.message })
            } else {
              ErrorMonitor.log('Unknown property path / profil form', violation)
            }
          })
        }
      })
  })

  return (
    <VoxCard {...props.cardProps}>
      <VoxCard.Content>
        {props.children({ control, formState })}
        <XStack justifyContent="flex-end" gap="$2">
          <VoxButton variant="outlined" display={formState.isDirty ? 'flex' : 'none'} onPress={() => reset()}>
            Annuler
          </VoxButton>
          <VoxButton variant="outlined" theme="blue" onPress={onSubmit} loading={isPending} disabled={!formState.isDirty || !formState.isValid}>
            Enregister
          </VoxButton>
        </XStack>
      </VoxCard.Content>
    </VoxCard>
  )
}

export default AbstractForm
