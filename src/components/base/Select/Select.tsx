import { ComponentProps, ComponentPropsWithoutRef, forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import { Check, ChevronDown, Search, X } from '@tamagui/lucide-icons'
import _ from 'lodash'
import { Adapt, isWeb, Popover, styled, useMedia, XStack, YStack } from 'tamagui'
import { useDebounce } from 'use-debounce'
import Input, { InputProps } from '../Input/Input'
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
  onBlur?: () => void
  onPress?: () => void
  search?: boolean
  forceSelect?: boolean
  labelOnlySheet?: boolean
  defaultRightIcon?: React.ReactNode
  background?: string
  disabled?: boolean
  color?: InputProps['color']
  size?: InputProps['size']
}

type TriggerProps<A extends string> = {
  value?: string
  onChange?: (value: A) => void
  fake?: boolean
}

const Trigger = forwardRef<TextInput, TriggerProps<A> & ComponentPropsWithoutRef<typeof Input>>((props, ref) => {
  return <Input fake={props.fake} ref={ref} {...props} selectTextOnFocus />
})

export const ListFrame = styled(YStack, {
  flex: 1,
  width: '100%',
  $gtMd: {
    borderWidth: 1,
    borderColor: '$gray1',
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

export const ItemFrame = styled(XStack, {
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',

  $gtMd: {
    cursor: 'pointer',
    paddingHorizontal: '$3',
    h: '$3',
    minWidth: '$20',
    borderColor: '$gray1',
    borderStyle: 'dashed',
  },

  $md: {
    backgroundColor: '$white1',
    flex: 1,
    minHeight: '$5',
    paddingHorizontal: '$4.5',

    borderColor: '$gray1',
    hoverStyle: {
      backgroundColor: '$gray0',
      borderColor: '$gray1',
    },
    pressStyle: {
      backgroundColor: '$gray1',
      borderColor: '$gray0',
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '$gray1',
        hoverStyle: {
          backgroundColor: '$gray1',
        },
      },
      false: {
        backgroundColor: '$white1',
        $gtMd: {
          pressStyle: {
            backgroundColor: '$gray1',
          },
        },

        borderColor: '$gray1',
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
    backgroundColor: '$gray0',
  },
  pressStyle: {
    backgroundColor: '$gray1',
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
  color,
  onPress,
  defaultRightIcon,
  onBlur,
  disabled,
  size,
  forceSelect = true,
}: SelectProps<A>) => {
  const selectedOption = options.find((o) => o.value === value)

  const [query, setQuery] = useState(selectedOption?.label ?? '')
  const [open, setOpen] = useState(false)
  const media = useMedia()
  const [triggerWidth, setTriggerWidth] = useState(0)
  const inputModalRef = useRef<TextInput>(null)

  const handleChange = (v: A) => {
    const finalQuery = options.find((o) => o.value === v)?.label ?? ''
    setQuery(finalQuery)
    onChange?.(v)
    setOpen(false)
    onBlur?.()
    Keyboard.dismiss()
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
  const filterQuery = useMemo(() => {
    if (query.length === 0) return options
    return options.filter((o) => o.label.toLowerCase().trim().includes(query.toLowerCase()))
  }, [query, options])

  const _filteredOptions = queryHandler || querySync ? options : filterQuery
  const [filteredOptions] = useDebounce(_filteredOptions, 200)

  const handleOpen = (x: boolean) => {
    setOpen(x)
    if (!x) {
      Keyboard.dismiss()
      onBlur?.()
      if (!forceSelect && query.length === 0) {
        handleChange('' as A)
        setQuery('')
        return
      }
      if ((!selectedOption || (selectedOption && !querySync)) && (filteredOptions.length > 0 || options.length > 0)) {
        handleChange(filteredOptions[0] ? filteredOptions[0].value : options[0].value)
      } else {
        setQuery(selectedOption?.label ?? '')
      }
    } else if (search) {
      inputModalRef.current?.focus()
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

  const isSearching = search && query.length > 0
  const isFake = !search || media.md
  const inputIcon = (icon: React.ReactNode, dyn = true) => (isSearching && dyn ? <X /> : icon)
  const inputRef = useRef<TextInput>(null)

  return (
    <Popover onOpenChange={handleOpen} open={open} size="$6">
      <Popover.Trigger height="auto" flex={1} asChild={!isWeb} disabled={disabled}>
        <Trigger
          onPress={onPress}
          ref={inputRef}
          onLayout={(e) => setTriggerWidth(e.nativeEvent.layout.width)}
          label={label}
          placeholder={placeholder}
          value={query}
          onChangeText={handleQuery}
          loading={loading}
          error={error}
          disabled={disabled}
          fake={isFake}
          size={size}
          onBlur={onBlur}
          color={color}
          iconRight={inputIcon(defaultRightIcon ?? <ChevronDown />, !isFake && open)}
          onIconRightPress={
            isSearching && !isFake && open
              ? (e) => {
                  e.stopPropagation()
                  setQuery('')
                  handleQuery('')
                  setTimeout(() => {
                    inputRef.current?.focus()
                  }, 100)
                }
              : undefined
          }
        />
      </Popover.Trigger>
      <Adapt when="md">
        <Popover.Sheet modal dismissOnSnapToBottom native>
          <Popover.Sheet.Frame>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} keyboardVerticalOffset={50} style={{ flex: 1 }}>
              <Popover.Sheet.Handle backgroundColor="$textDisabled" mt="$3.5" mb="$0" height={4} />

              <YStack paddingHorizontal="$4.5">
                <XStack paddingVertical="$5" alignItems="center" justifyContent="space-between">
                  <Text fontWeight="$6" fontSize="$5">
                    {label}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setOpen(false)
                      if (search) Keyboard.dismiss()
                      onBlur?.()
                    }}
                    style={{ padding: 5 }}
                  >
                    <X />
                  </TouchableOpacity>
                </XStack>
                <YStack display={search ? 'flex' : 'none'} height="$6" pb="$3.5">
                  <Input
                    ref={inputModalRef}
                    placeholder={placeholder}
                    value={query}
                    onChangeText={handleQuery}
                    selectTextOnFocus
                    color="gray"
                    iconRight={inputIcon(<Search />)}
                    onIconRightPress={isSearching ? () => setQuery('') : undefined}
                    loading={loading}
                  />
                </YStack>
              </YStack>
              <ListFrame>
                <Popover.Sheet.ScrollView
                  keyboardShouldPersistTaps="always"
                  contentContainerStyle={{
                    paddingBottom: 110,
                  }}
                >
                  {list}
                </Popover.Sheet.ScrollView>
              </ListFrame>
            </KeyboardAvoidingView>
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content p={0} minWidth={triggerWidth}>
        <Popover.Arrow borderWidth={0} unstyled m={0} p={0} h="0" overflow="hidden" display="none" />
        <ListFrame mt={-25}>
          <Popover.ScrollView keyboardShouldPersistTaps="always">{list}</Popover.ScrollView>
        </ListFrame>
      </Popover.Content>
    </Popover>
  )
}

export default Select
