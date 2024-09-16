import React from 'react'
import { VoxButton } from '@/components/Button'
import { Plus } from '@tamagui/lucide-icons'
import { View, ViewProps } from 'tamagui'

type ActionCreateButtonProps = {
  onPress: () => void
} & ViewProps

const ActionCreateButton = (props: ActionCreateButtonProps) => (
  <View {...props}>
    <VoxButton full pop size="lg" theme="purple" variant="soft" borderColor="$colorPop" borderWidth="$1" iconLeft={Plus} onPress={props.onPress}>
      Créer une action
    </VoxButton>
  </View>
)

export default ActionCreateButton

// style={styles.createActionContainer} display={canIAddAction ? 'flex' : 'none'}
