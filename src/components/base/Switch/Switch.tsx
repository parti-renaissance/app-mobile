import React, { useState } from 'react'
import { SwitchProps, Switch as TSwitch, View } from 'tamagui'
import Text from '../Text'

export const Switch = ({ checked, onCheckedChange }: SwitchProps) => {
  return (
    <TSwitch
      borderColor={checked ? '$green5' : '$gray3'}
      backgroundColor={checked ? '$green5' : '$gray3'}
      checked={checked}
      onCheckedChange={onCheckedChange}
      marginLeft="auto"
      size={'$3'}
    >
      <TSwitch.Thumb backgroundColor={checked ? '$green1' : '$gray1'} animation="quick" />
    </TSwitch>
  )
}

function _LineSwitch(props: { children: React.ReactNode } & SwitchProps) {
  const [checked, setChecked] = useState(props.checked)
  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked)
    props.onCheckedChange?.(checked)
  }
  return (
    <View flexDirection="row" maxWidth="100%" alignItems="center" gap="$2.5" onPress={() => setChecked((x) => !x)}>
      <Text flex={1}>{typeof props.children === 'string' ? <Text>{props.children}</Text> : props.children}</Text>
      <Switch checked={checked} onCheckedChange={handleCheckedChange} />
    </View>
  )
}

export const LineSwitch = React.memo(_LineSwitch)
