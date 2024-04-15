import React, { useCallback, useMemo } from 'react'
import { FormikValues, useFormikContext } from 'formik'

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
    onBlur: () => ReturnType<FormikValues['setFieldTouched']>
  }
  touched: boolean
}

const FormikController = <Values,>({ children, name }: FormikControllerProps<Values>) => {
  const formik = useFormikContext<Values>()
  const onChange = useCallback((data: any) => formik.setFieldValue(name, data), [name])
  const onBlur = useCallback(() => formik.setFieldTouched(name, true), [name])
  const value = formik.values[name] as any
  const error = !!formik.touched[name] && !!formik.errors[name] ? formik.errors[name] : undefined
  const touched = useMemo(() => formik.touched[name], [formik.touched[name]]) as boolean
  const inputProps = useMemo(() => ({ value, error, onChange, onBlur, id: name }), [value, error, onChange, onBlur, name])
  const args = useMemo(() => ({ inputProps, touched }), [inputProps])
  const child = children(args)

  return child
}

export default FormikController
