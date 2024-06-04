import React, { ComponentProps, forwardRef, useEffect, useId } from 'react'
import { type TextInput } from 'react-native'
import { Input } from '@/components/Bento/Inputs/components/inputsParts'
import { useForwardFocus } from '@/hooks/useForwardFocus'
import { useForwardRef } from '@/hooks/useForwardRef'
import { AlertCircle } from '@tamagui/lucide-icons'
import { isWeb, Spinner, Theme, XStack, YStack } from 'tamagui'

/**
 * note: make sure to use the same width for the Input and the Input.Area
 */

type InputProps = {
  id?: string
  small?: boolean
  minimal?: boolean
  error?: string
  label?: string
  info?: string
  iconLeft?: React.ReactNode
  iconRightPress?: () => void
  iconRight?: React.ReactNode
  loading?: boolean
  fake?: boolean
  type?: string
} & ComponentProps<typeof Input.Area>

export default forwardRef<TextInput, InputProps>(function VoxInput(props, ref) {
  const { size, minimal, error, label, info, iconLeft, iconRight, small, loading, ...rest } = props
  const uniqueId = useId()
  const id = `${uniqueId}-${props.id ?? ''}`
  const inputRef = useForwardRef(ref)
  const focusTrigger = useForwardFocus(inputRef)
  const textInfo = !error && info ? info : error
  const theme = error ? 'red' : 'gray'

  useEffect(() => {
    if (inputRef.current && props.type && isWeb) {
      // @ts-expect-error wrong type on input
      inputRef.current.type = props.type
    }
  }, [props.type])

  return (
    <Theme name={theme}>
      <Input flex={1} size={size ?? (small ? '$2' : '$3')} theme="VoxInput">
        <YStack width="100%" gap={minimal ? 'unset' : undefined}>
          {label && (
            <Input.Label htmlFor={id} size="$1" fontWeight="$4" paddingBottom={minimal ? 0 : undefined}>
              {label}
            </Input.Label>
          )}
          <Input.Box
            minimal={minimal}
            backgroundColor={minimal ? '$colorTransparent' : props.backgroundColor ?? '$backgroundColor'}
            hoverStyle={{
              backgroundColor: minimal ? '$colorTransparent' : undefined,
            }}
            pressStyle={{
              backgroundColor: minimal ? '$colorTransparent' : undefined,
            }}
          >
            {iconLeft && (
              <Input.Icon paddingLeft={minimal ? 0 : undefined} {...focusTrigger}>
                {iconLeft}
              </Input.Icon>
            )}
            {props.fake ? (
              <YStack height={35} onPress={props.onPress} flex={1}>
                <XStack alignItems="center" justifyContent="center" flex={1}>
                  <Input.Fake
                    paddingHorizontal="$3"
                    maxWidth={props.maxWidth}
                    numberOfLines={1}
                    paddingLeft={minimal || iconLeft ? 0 : '$2'}
                    paddingRight={minimal || iconRight ? 0 : '$2'}
                    borderBottomWidth={0}
                  >
                    {props.value && props.value.length > 0 ? props.value : props.placeholder}
                  </Input.Fake>
                </XStack>
              </YStack>
            ) : (
              <Input.Area
                ref={inputRef}
                paddingLeft={minimal || iconLeft ? 0 : undefined}
                paddingRight={minimal || iconRight ? 0 : undefined}
                borderBottomWidth={0}
                underlineColorAndroid={'transparent'}
                {...rest}
                id={id}
              />
            )}
            {(iconRight || loading) && (
              <Input.Icon paddingRight={minimal ? 0 : undefined} onPress={props.iconRightPress ?? props.onPress ?? (() => inputRef.current.focus())}>
                {loading ? <Spinner /> : iconRight}
              </Input.Icon>
            )}
          </Input.Box>
        </YStack>
        {textInfo && (
          <XStack alignItems="center">
            {error && (
              <Input.Icon paddingLeft={0} paddingRight="$2">
                <AlertCircle size="$0.75" />
              </Input.Icon>
            )}
            <Input.Info fontSize="$1" fontWeight="$4" color={'$textDisabled'}>
              {textInfo}
            </Input.Info>
          </XStack>
        )}
      </Input>
    </Theme>
  )
})
