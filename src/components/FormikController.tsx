import React, { useCallback, useMemo } from 'react'
import { FormikValues, useFormikContext } from 'formik'
import { get } from 'lodash'

type FormikControllerProps<Values> = {
  children: (args: ArgsFormikField<Values>) => React.ReactNode
  name: string
}

type ArgsFormikField<Data> = {
  inputProps: {
    id: string
    value: any
    error: string | undefined
    onChange: (data: any) => ReturnType<FormikValues['setFieldValue']>
    onBlur: (fieldOrEvent: any) => void
  }
  touched: boolean
}

const FormikController = <Values,>({ children, name }: FormikControllerProps<Values>) => {
  const formik = useFormikContext<Values>()
  const onChange = useCallback(formik.handleChange(name), [name])
  const onBlur = useCallback(formik.handleBlur(name), [name])
  const value = get(formik.values, name)
  const error = !!get(formik.touched, name) && !!get(formik.errors, name) ? get(formik.errors, name) : undefined
  const touched = useMemo(() => get(formik.touched, name), [get(formik.touched, name)]) as boolean
  const inputProps = useMemo(() => ({ value, error, onChange, onBlur, id: name }), [value, error, onChange, onBlur, name])
  const args = useMemo(() => ({ inputProps, touched }), [inputProps])

  return children(args)
}

export default FormikController
