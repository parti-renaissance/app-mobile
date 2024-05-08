import React, { useCallback } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Search, XCircle } from '@tamagui/lucide-icons'
import { useDebouncedCallback } from 'use-debounce'
import Input from '../base/Input/Input'
import Button from '../Button/Button'

type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const searchInputRef = React.useRef<TextInput>(null)
  const setDebouncedSearchQuery = useDebouncedCallback(onChange, 300)
  const [inValue, setInValue] = React.useState(value)
  const handleDebouncedSearchChange = (text: string) => {
    setDebouncedSearchQuery(text)
    setInValue(text)
  }

  const handleSearchChange = (text: string) => {
    setDebouncedSearchQuery(text)
    setInValue(text)
  }

  const IconRight = useCallback((props: { isInputFill: boolean }) => {
    const handleClearSearch = () => handleSearchChange('')
    return props.isInputFill ? (
      <Button variant="text" onPress={handleClearSearch}>
        <XCircle />
      </Button>
    ) : (
      <Search />
    )
  }, [])

  return (
    <Input
      placeholder="Rechercher un événement"
      backgroundColor={'$white1'}
      size={'$5'}
      ref={searchInputRef}
      value={inValue}
      iconRight={<IconRight isInputFill={value.length > 0} />}
      onChangeText={handleDebouncedSearchChange}
    />
  )
}

export default React.memo(SearchBox)
