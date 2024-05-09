import React, { ComponentProps, forwardRef, useCallback } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useForwardRef } from '@/hooks/useForwardRef'
import { Search, XCircle } from '@tamagui/lucide-icons'
import Input from '../base/Input/Input'
import Button from '../Button/Button'

type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
  onFocus?: TextInputProps['onFocus']
} & Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'onFocus'>

const SearchBox = forwardRef<TextInput, SearchBoxProps>(({ value, onChange, onFocus, ...rest }, ref) => {
  const searchInputRef = useForwardRef(ref)

  const IconRight = useCallback((props: { isInputFill: boolean }) => {
    return props.isInputFill ? (
      <Button variant="text" onPress={() => onChange('')}>
        <XCircle />
      </Button>
    ) : (
      <Search />
    )
  }, [])

  return (
    <Input
      placeholder="Rechercher un événement"
      size={'$4'}
      ref={searchInputRef}
      value={value}
      onFocus={onFocus}
      iconRight={<IconRight isInputFill={value.length > 0} />}
      onChangeText={onChange}
      {...rest}
    />
  )
})

export default SearchBox
