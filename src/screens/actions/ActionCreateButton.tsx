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
    <Button full pop size="lg" theme="purple" variant="soft" borderColor="$color7" borderWidth="$1" onPress={props.onPress}>
      <Plus color="$purple7" size="$1" />
      <Button.Text fontSize="$2" fontWeight="$7" color="$purple7">
        Créer une action
      </Button.Text>
    </Button>
  </View>
)

export default ActionCreateButton

// style={styles.createActionContainer} display={canIAddAction ? 'flex' : 'none'}
