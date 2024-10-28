import { useCallback, useMemo, useRef, useState } from 'react'
import { type TextInput } from 'react-native'
import { ModalDropDownRef, SelectProps } from './types'

const useSelectSearch = ({ options, searchableOptions }: Pick<SelectProps<string>, 'options' | 'searchableOptions'>) => {
  const [query, _setQuery] = useState('')
  const setQuery = useCallback(_setQuery, [])
  const queryInputRef = useRef<TextInput>(null)
  const items = useMemo(() => options.map((x) => ({ id: x.value, title: x.label })), [options])
  const filteredItems = useMemo(() => items.filter((x) => x.title.toLowerCase().includes(query.toLowerCase())), [items, query])
  const searchableIcon = useMemo(() => (searchableOptions?.icon ? <searchableOptions.icon color="$textPrimary" /> : undefined), [searchableOptions])

  return {
    setQuery,
    queryInputRef,
    filteredItems,
    searchableIcon,
  }
}

export default useSelectSearch
