import { forwardRef, useEffect, useState } from 'react'
import { LayoutChangeEvent, NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from 'react-native'
import { useForwardRef } from '@/hooks/useForwardRef'
import { isEdge } from '@shopify/react-native-skia'
import { AlertCircle } from '@tamagui/lucide-icons'
import { AnimatePresence, isWeb, Spinner, styled, Text, XStack, YStack } from 'tamagui'
import { gray } from 'theme/colors.hsl'

export type InputProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'white' | 'gray'
  error?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onChange?: (text: string) => void
  onIconRightPress?: () => void
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time'
  fake?: boolean
} & Omit<TextInputProps, 'placeholder' | 'onChange'>

const sizes = {
  xs: {
    height: 3.5,
  },
  sm: {
    height: 4,
  },
  md: {
    height: 4.5,
  },
  lg: {
    height: 56,
  },
}

const InputFrame = styled(XStack, {
  name: 'Input',
  gap: '$2.5',
  width: '100%',
  minWidth: 100,
  minHeight: '$3.5',
  alignItems: 'center',
  borderRadius: '$10',
  paddingHorizontal: '$5',
  borderWidth: '$1',
  borderColor: '$colorTransparent',
  animation: 'bouncy',
  hoverStyle: {
    backgroundColor: 'rgba(237, 239, 242, 1)',
    cursor: 'text',
  },
  focusStyle: {
    borderColor: '$blue9',
  },

  disabledStyle: {
    backgroundColor: '$gray2',
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  variants: {
    loading: {
      true: {
        paddingRight: '$2.5',
      },
    },
    iconLeft: {
      true: {
        paddingLeft: '$2.5',
      },
    },
    iconRight: {
      true: {
        paddingRight: '$2.5',
      },
    },
    error: {
      true: {
        backgroundColor: '$red/8',
        focusStyle: {
          borderColor: '$red8',
        },
      },
    },
    color: {
      white: {
        backgroundColor: '$white1',
      },
      gray: {
        backgroundColor: '$gray2',
      },
    },

    size: {
      xs: {
        minHeight: '$3.5',
      },
      sm: {
        minHeight: '$4',
      },
      md: {
        minHeight: '$4.5',
      },
      lg: {
        minHeight: 56,
      },
    },
  },
})

export default forwardRef<TextInput, InputProps>(function Input(_props, ref) {
  const {
    size,
    color,
    error,
    label,
    placeholder,
    disabled,
    loading,
    iconLeft,
    iconRight,
    type,
    fake,
    onFocus,
    onBlur,
    onChangeText,
    onIconRightPress,
    onChange,
    ...inputProps
  } = _props
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useForwardRef(ref)
  const isFailed = !!error
  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    onFocus?.(e)
  }
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleValueChange = (text: string) => {
    onChangeText?.(text)
    onChange?.(text)
  }

  const handleChange = (evt: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (inputProps.multiline && isWeb) adjustTextInputSize(evt)
  }

  const handleLayoutChange = (evt: LayoutChangeEvent) => {
    if (inputProps.multiline && isWeb) adjustTextInputSize(evt)
  }

  const adjustTextInputSize = (evt) => {
    if (!isWeb) return
    const el = evt?.target || evt?.nativeEvent?.target
    if (el) {
      const lastHeight = el.style.height
      el.style.height = 0
      const newHeight = el.offsetHeight - el.clientHeight + el.scrollHeight

      if (newHeight < 200) {
        el.style.height = `${newHeight}px`
      } else {
        el.style.height = lastHeight
      }
    }
  }

  const handlePress = (e) => {
    if (disabled) {
      if (isWeb) e.preventDefault()
      return
    }
    inputProps.onPress?.(e)
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (inputRef.current && type && isWeb) {
      // @ts-expect-error wrong type on input
      inputRef.current.type = type
    }
  }, [type])

  return (
    <YStack gap="$1" flex={1}>
      <InputFrame
        disabled={disabled}
        color={color ?? 'white'}
        size={size ?? 'md'}
        error={isFailed}
        loading={loading}
        forceStyle={isFocused ? 'focus' : undefined}
        onPress={handlePress}
        iconLeft={!!iconLeft}
        iconRight={!!iconRight}
        maxHeight={`$${sizes[size ?? 'md'].height + (inputProps.multiline ? 5 : 0)}`}
      >
        {!loading && iconLeft && (
          <YStack height="100%" justifyContent="center">
            {iconLeft}
          </YStack>
        )}
        <YStack gap="$1" flex={1} height="100%" justifyContent="center" position="relative" paddingVertical={`$${sizes[size ?? 'md'].height - 1.5}`}>
          <AnimatePresence>
            {(label || (placeholder && inputProps.value && inputProps.value.length > 0)) && (
              <YStack
                gap="$1"
                flex={1}
                alignSelf="flex-start"
                justifyContent="center"
                position="absolute"
                top={0}
                left={0}
                animation="bouncy"
                enterStyle={{
                  opacity: 0,
                }}
                exitStyle={{
                  opacity: 0,
                }}
              >
                <Text color="$textSecondary" fontSize={10}>
                  {label ?? placeholder}
                </Text>
              </YStack>
            )}
          </AnimatePresence>
          {fake ? (
            <Text color={placeholder ? gray.gray5 : gray.gray8} fontSize={14} numberOfLines={1} borderBottomWidth={0}>
              {inputProps.value || placeholder}
            </Text>
          ) : (
            <TextInput
              style={{
                color: gray.gray8,
                padding: 0,
                fontSize: 14,
                width: '100%',
                height: '100%',
              }}
              editable={!disabled}
              ref={inputRef}
              value={inputProps.value}
              onChangeText={handleValueChange}
              placeholderTextColor={gray.gray5}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...inputProps}
              onChange={handleChange}
              onLayout={handleLayoutChange}
              onPress={disabled ? undefined : inputProps.onPress}
            />
          )}
        </YStack>
        {!loading && iconRight && (
          <YStack height="100%" justifyContent="center" onPress={onIconRightPress}>
            {iconRight}
          </YStack>
        )}
        {loading && <Spinner color="$blue7" />}
      </InputFrame>
      {error && (
        <XStack gap="$1" alignItems="center">
          <AlertCircle color="$red8" size={10} />
          <Text color="$red8" fontSize={10}>
            {error}
          </Text>
        </XStack>
      )}
    </YStack>
  )
})
