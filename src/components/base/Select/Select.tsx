import { ComponentProps, memo, useCallback, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useLazyRef } from '@/hooks/useLazyRef'
import { Check, ChevronDown, Search, X } from '@tamagui/lucide-icons'
import _ from 'lodash'
import { Adapt, Popover, styled, useMedia, XStack, YStack } from 'tamagui'
import Input from '../Input/Input'
import Text from '../Text'

type SelectProps<A extends string> = {
  value?: A
  placeholder?: string
  error?: string
  loading?: boolean
  onChange?: (value: A) => void
  options: { value: A; label: string }[]
  queryHandler?: (query: string) => void
  label?: string
  minimal?: boolean
  onBlur?: () => void
  onPress?: () => void
  search?: boolean
}

type TriggerProps<A extends string> = {
  value?: string
  onChange?: (value: A) => void
  fake?: boolean
}

const Trigger = <A extends string>(props: TriggerProps<A> & ComponentProps<typeof Input>) => {
  return (
    <YStack flex={1} position="relative">
      {props.fake && <YStack position="absolute" zIndex={1} top={0} left={0} right={0} bottom={0}></YStack>}
      <Input pointerEvents={props.fake ? 'none' : 'auto'} fake={props.fake} {...props} selectTextOnFocus />
    </YStack>
  )
}

const ListFrame = styled(YStack, {
  flex: 1,
  width: '100%',
  $gtMd: {
    borderWidth: 1,
    borderColor: '$gray/32',
    overflow: 'hidden',
    borderRadius: '$3',
    maxHeight: '$12',
  },
})

type ItemProps<A extends string> = {
  value: A
  label: string
  onSelect: (value: A) => void
  selected: boolean
}

const ItemFrame = styled(XStack, {
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  animation: 'quick',

  enterStyle: {
    opacity: 0,
  },
  exitStyle: {
    opacity: 0,
    scale: 0.9,
  },

  $gtMd: {
    cursor: 'pointer',
    paddingHorizontal: '$3',
    h: '$3',
    minWidth: '$20',
    borderColor: '$gray/32',
    borderStyle: 'dashed',
  },

  $md: {
    backgroundColor: '$white1',
    flex: 1,
    h: '$5',
    paddingHorizontal: '$4.5',

    borderColor: '$gray/32',
    hoverStyle: {
      backgroundColor: '$gray1',
      borderColor: '$gray/24',
    },
    pressStyle: {
      backgroundColor: '$gray1',
      borderColor: '$gray/24',
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '$gray3',
        hoverStyle: {
          backgroundColor: '$gray3',
        },
      },
      false: {
        backgroundColor: '$white1',
        $gtMd: {
          backgroundColor: '$gray1',
          pressStyle: {
            backgroundColor: '$gray2',
          },
        },

        borderColor: '$gray/32',
      },
    },

    empty: {
      true: {
        color: '$textDisabled',
      },
    },
    last: {
      true: {
        borderWidth: 0,
        borderBottomWidth: 0,
      },
      false: {
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    },
  },
  hoverStyle: {
    backgroundColor: '$gray2',
  },
  pressStyle: {
    backgroundColor: '$gray3',
  },
})

const Item = <A extends string>({ value, label, onSelect, selected, empty, ...props }: ItemProps<A> & ComponentProps<typeof ItemFrame>) => {
  return (
    <ItemFrame selected={selected} onPress={() => onSelect(value)} {...props}>
      <Text fontWeight={empty ? '$4' : '$5'} color={empty ? '$textSecondary' : '$textPrimary'} fontStyle={empty ? 'italic' : 'normal'}>
        {label}
      </Text>
      {selected && <Check size="$1" color="$textPrimary" />}
    </ItemFrame>
  )
}

const MemoItem = memo(Item)

const Select = <A extends string>({
  search = true,
  value,
  onChange,
  options,
  placeholder,
  queryHandler,
  label,
  loading,
  error,
  onBlur,
  minimal,
  onPress,
}: SelectProps<A>) => {
  const selectedOption = options.find((o) => o.value === value)

  const [query, setQuery] = useState(selectedOption?.label ?? '')
  const [open, setOpen] = useState(false)
  const media = useMedia()
  const [triggerWidth, setTriggerWidth] = useState(0)

  const handleChange = (v: A) => {
    const finalQuery = options.find((o) => o.value === v)?.label ?? ''
    console.log('finalQuery', finalQuery)
    setQuery(finalQuery)
    onChange?.(v)
    setOpen(false)
  }

  const handleQuery = useCallback(
    (q: string) => {
      setQuery(q)
      setOpen(true)
      queryHandler?.(q)
    },
    [queryHandler],
  )

  const querySync = query === selectedOption?.label

  const filteredOptions = queryHandler || querySync ? options : options.filter((o) => o.label.toLowerCase().trim().includes(query.toLowerCase()))

  const handleOpen = (x: boolean) => {
    setOpen(x)
    if (!x) {
      // onBlur?.()
      if ((!selectedOption || (selectedOption && !querySync)) && (filteredOptions.length > 0 || options.length > 0)) {
        handleChange(filteredOptions[0] ? filteredOptions[0].value : options[0].value)
      } else {
        setQuery(selectedOption?.label ?? '')
      }
    }
  }
  const last = _.last(filteredOptions)
  const list = useMemo(() => {
    return filteredOptions.length > 0
      ? filteredOptions.map((o) => (
          <MemoItem
            key={o.value}
            value={o.value}
            label={o.label}
            selected={o.value === selectedOption?.value}
            onSelect={handleChange}
            testID="SelectItem"
            last={last?.value === o.value}
          />
        ))
      : [<MemoItem empty key="empty" value="" label="Aucun résultat trouvé" selected={false} onSelect={() => {}} last={true} />]
  }, [filteredOptions, selectedOption, handleChange, last])

  const inputIcon = (icon: React.ReactNode) => (search && query.length > 0 ? <X onPress={() => setQuery('')} /> : icon)

  return (
    <Popover onOpenChange={handleOpen} open={open} size="$6">
      <Popover.Trigger height="auto" flex={1} onPress={onPress}>
        <Trigger
          onLayout={(e) => setTriggerWidth(e.nativeEvent.layout.width)}
          // label={label}
          placeholder={placeholder}
          value={query}
          onChangeText={handleQuery}
          loading={loading}
          error={error}
          fake={!search || media.md}
          minimal={minimal}
          iconRight={inputIcon(<ChevronDown />)}
        />
      </Popover.Trigger>
      <Adapt when="md">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame>
            <Popover.Sheet.Handle backgroundColor="$textDisabled" mt="$3.5" mb="$0" height={4} />

            <YStack paddingHorizontal="$4.5">
              <XStack paddingVertical="$5" alignItems="center" justifyContent="space-between">
                <Text fontWeight="$6" fontSize="$5">
                  {label}
                </Text>
                <TouchableOpacity onPress={() => setOpen(false)} style={{ padding: 5 }}>
                  <X />
                </TouchableOpacity>
              </XStack>
              <YStack display={search ? 'flex' : 'none'} p pb="$3.5" flexGrow={1} h="$5">
                <Input
                  placeholder={placeholder}
                  value={query}
                  onChangeText={handleQuery}
                  selectTextOnFocus
                  iconRight={inputIcon(<Search />)}
                  loading={loading}
                />
              </YStack>
            </YStack>
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content p={0} minWidth={triggerWidth}>
        <Popover.Arrow borderWidth={0} unstyled m={0} p={0} h="0" overflow="hidden" display="none" />
        <ListFrame>
          <Popover.ScrollView keyboardShouldPersistTaps="always">{list}</Popover.ScrollView>
        </ListFrame>
      </Popover.Content>
    </Popover>
  )
}

export default Select
