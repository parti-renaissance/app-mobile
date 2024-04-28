import React, { useId, useRef } from 'react'
import type { TextInput } from 'react-native'
import { Input } from '@/components/Bento/Inputs/components/inputsParts'
import { useForwardFocus } from '@/hooks/useForwardFocus'
import { AlertCircle } from '@tamagui/lucide-icons'
import type { SizeTokens } from 'tamagui'
import { Theme, View } from 'tamagui'

/**
 * note: make sure to use the same width for the Input and the Input.Area
 */

/** ------ EXAMPLE ------ */
export default function InputWithErrorDemo({ size = '$4', minimal, error }: { size?: SizeTokens; minimal?: boolean; error?: string }) {
  const uniqueId = useId()

  const inputRef = useRef<TextInput>(null)
  const focusTrigger = useForwardFocus(inputRef)
  return (
    <Theme name={error ? 'red_VoxInput' : 'gray_VoxInput'}>
      <View flexDirection="column" justifyContent="center" alignItems="center">
        <Input minWidth="100%">
          <Input.Label htmlFor={uniqueId + 'email'} size="$1" fontWeight="$4">
            Label
          </Input.Label>
          <Input.Box minimal={minimal}>
            {error && (
              <Input.Icon {...focusTrigger}>
                <AlertCircle />
              </Input.Icon>
            )}
            <Input.Area ref={inputRef} paddingLeft={error ? 0 : undefined} id={uniqueId + 'email'} placeholder="example@something" />
          </Input.Box>
          {error && <Input.Info fontSize="$1">{error}</Input.Info>}
        </Input>
      </View>
    </Theme>
  )
}
