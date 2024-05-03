import React, { ComponentProps, forwardRef, useId } from 'react'
import type { TextInput } from 'react-native'
import { Input } from '@/components/Bento/Inputs/components/inputsParts'
import { useForwardFocus } from '@/hooks/useForwardFocus'
import { useForwardRef } from '@/hooks/useForwardRef'
import { AlertCircle } from '@tamagui/lucide-icons'
import { Spinner, Theme, XStack, YStack } from 'tamagui'

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
  iconRight?: React.ReactNode
  loading?: boolean
} & ComponentProps<typeof Input.Area>

export default forwardRef<TextInput, InputProps>(function VoxInput(props, ref) {
  const { size, minimal, error, label, info, iconLeft, iconRight, small, loading, ...rest } = props
  const uniqueId = useId()
  const id = `${uniqueId}-${props.id ?? ''}`
  const inputRef = useForwardRef(ref)
  const focusTrigger = useForwardFocus(inputRef)
  const textInfo = !error && info ? info : error
  const theme = !!error ? 'red' : 'gray'
  return (
    <Theme name={theme}>
      <Input flex={1} size={small ? '$2' : '$3'} theme="VoxInput">
        <YStack width="100%" gap={minimal ? 'unset' : undefined}>
          {label && (
            <Input.Label htmlFor={id} size="$1" fontWeight="$4" paddingBottom={minimal ? 0 : undefined}>
              {label}
            </Input.Label>
          )}
          <Input.Box
            minimal={minimal}
            backgroundColor={minimal ? '$colorTransparent' : undefined}
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
            <Input.Area
              ref={inputRef}
              paddingLeft={minimal || iconLeft ? 0 : undefined}
              paddingRight={minimal || iconRight ? 0 : undefined}
              borderBottomWidth={0}
              underlineColorAndroid={'transparent'}
              {...rest}
              id={id}
            />
            {(iconRight || loading) && (
              <Input.Icon paddingRight={minimal ? 0 : undefined} {...focusTrigger}>
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
