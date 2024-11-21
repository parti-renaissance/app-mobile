import React, { RefObject, useCallback } from 'react'
import { TextInput } from 'react-native'
import AssemblySelect from '@/components/AssemblySelect/AssemblySelect'
import { useSession } from '@/ctx/SessionProvider'
import { eventFiltersState } from '@/features/events/store/filterStore'
import { useGetProfil } from '@/services/profile/hook'
import { YStack } from 'tamagui'
import SearchBox from './SearchBox'

type EventFiltersProps = {
  onSearchFocus?: () => void
}

const EventFilters = ({ onSearchFocus }: EventFiltersProps) => {
  const { value, setValue, searchInputRef } = eventFiltersState()
  const { isAuth } = useSession()
  const { data: user } = useGetProfil({ enabled: isAuth })
  const defaultAssembly = user?.instances?.assembly?.code

  const handleAssemblyChange = useCallback((x?: { value: string; label: string }) => {
    setValue((y) => ({ ...y, zone: x?.value, detailZone: x }))
  }, [])

  const handleSearchChange = useCallback((x: string) => {
    setValue((y) => ({ ...y, search: x }))
  }, [])
  console.log(value.zone, defaultAssembly)

  return (
    <YStack gap="$medium" $lg={{ flexDirection: 'row', gap: '$small' }}>
      <YStack flex={2}>
        <AssemblySelect
          resetable={value.zone !== undefined && value.zone !== defaultAssembly}
          defaultValue={defaultAssembly}
          size="sm"
          id="filter-dept"
          color="white"
          value={value.zone}
          onDetailChange={handleAssemblyChange}
        />
      </YStack>
      <YStack flex={3}>
        <SearchBox
          label={value.detailZone ? `Dans ${value.detailZone.label}` : undefined}
          enterKeyHint="done"
          value={value.search}
          ref={searchInputRef as RefObject<TextInput>}
          onChange={handleSearchChange}
          onFocus={onSearchFocus}
        />
      </YStack>
    </YStack>
  )
}
const MemoizedEF = React.memo(EventFilters)

MemoizedEF.displayName = 'EventFilters'

export default MemoizedEF
