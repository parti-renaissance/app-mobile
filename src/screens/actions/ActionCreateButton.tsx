import React from 'react'
import Button from '@/components/Button'
import GradientButton from '@/components/Buttons/GradientButton'
import { Plus } from '@tamagui/lucide-icons'
import { View, ViewProps } from 'tamagui'

type ActionCreateButtonProps = {
  onPress: () => void
} & ViewProps

const ActionCreateButton = (props: ActionCreateButtonProps) => (
  <View {...props}>
    <GradientButton round onPress={props.onPress}>
      <Plus color="$purple7" size="$1" />
      <Button.Text fontSize="$2" fontWeight="$7" color="$purple7">
        Créer une action
      </Button.Text>
    </GradientButton>
  </View>
)

export default ActionCreateButton

// style={styles.createActionContainer} display={canIAddAction ? 'flex' : 'none'}
