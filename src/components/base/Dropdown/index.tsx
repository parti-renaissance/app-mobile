import React, { NamedExoticComponent, useCallback } from 'react'
import { FlatList, Modal, TouchableOpacity } from 'react-native'
import Text from '@/components/base/Text'
import { useLazyRef } from '@/hooks/useLazyRef'
import type { IconProps } from '@tamagui/helpers-icon'
import { Check } from '@tamagui/lucide-icons'
import { styled, ThemeableStack, XStack, YStack } from 'tamagui'

const DropdownItemFrame = styled(ThemeableStack, {
  paddingHorizontal: 20,
  gap: 16,
  backgroundColor: 'white',
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  borderBottomColor: '$textOutline',
  focusable: true,
  hoverStyle: {
    backgroundColor: '$textSurface',
  },
  pressStyle: {
    backgroundColor: '$gray1',
  },
  variants: {
    last: {
      true: {
        borderBottomWidth: 0,
      },
    },
    size: {
      sm: {
        height: 40,
      },
      md: {
        height: 48,
      },
      lg: {
        height: 56,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type ItemProps = {
  title: string
  subtitle?: string
  onPress?: () => void
  selected?: boolean
  color?: string
  icon?: NamedExoticComponent<IconProps>
} & React.ComponentPropsWithoutRef<typeof DropdownItemFrame>

const DropdownItem = ({ title, subtitle, color = '$textPrimary', ...props }: ItemProps) => {
  return (
    <DropdownItemFrame {...props}>
      <YStack flex={1}>
        <Text.MD semibold color={color}>
          {title}
        </Text.MD>
        {subtitle ? <Text.SM secondary>{subtitle}</Text.SM> : null}
      </YStack>
      <XStack>
        {props.icon ? <props.icon color={color} size={20} /> : null}
        {props.selected ? <Check color={color} size={20} /> : null}
      </XStack>
    </DropdownItemFrame>
  )
}

const DropdownFrame = styled(ThemeableStack, {
  backgroundColor: 'white',
  borderRadius: 16,
  overflow: 'hidden',
  elevation: 2,
  shadowColor: '$gray6',
  borderWidth: 1,
  borderColor: '$textOutline',
  variants: {
    size: {
      sm: {
        height: 40 * 4,
      },
      md: {
        width: 48 * 4,
      },
      lg: {
        width: 56 * 4,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type DropdownProps = {
  items: Array<ItemProps & { id: string }>
  onSelect: (value: string) => void
  value?: string
} & React.ComponentPropsWithoutRef<typeof DropdownFrame>

const MemoItem = React.memo(DropdownItem)

function Dropdown({ items, onSelect, value, ...props }: DropdownProps) {
  const { current: handleSelect } = useLazyRef(() => (id: string) => () => onSelect(id))
  return (
    <DropdownFrame {...props}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <MemoItem {...item} onPress={handleSelect(item.id)} selected={item.id === value} last={items.length - 1 === index} />}
      />
    </DropdownFrame>
  )
}

export function DropdownWrapper({ children, onSelect, ...props }: DropdownProps & { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const container = React.useRef<TouchableOpacity | null>(null)
  const [dropdownTop, setDropdownTop] = React.useState(0)
  const handleOpen = useCallback(() => {
    if (!container.current) return
    container.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h)
    })
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleSelect = useCallback((value: string) => {
    onSelect(value)
    setOpen(false)
  }, [])

  return (
    <TouchableOpacity ref={container} onPress={handleOpen}>
      <Modal visible={open} transparent animationType="fade" onRequestClose={handleClose}>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleClose}>
          <Dropdown {...props} onSelect={handleSelect} position="absolute" top={dropdownTop} alignSelf="center" minWidth={230} />
        </TouchableOpacity>
      </Modal>
      {children}
    </TouchableOpacity>
  )
}
