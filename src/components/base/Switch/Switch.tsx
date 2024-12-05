import React from 'react'
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
  const handleCheckedChange = (checked: boolean) => {
    props.onCheckedChange?.(checked)
  }
  return (
    <View flexDirection="row" maxWidth="100%" alignItems="center" gap="$medium" onPress={() => handleCheckedChange(!props.checked)}>
      <Text flex={1}>{typeof props.children === 'string' ? <Text>{props.children}</Text> : props.children}</Text>
      <Switch checked={props.checked} onCheckedChange={handleCheckedChange} />
    </View>
  )
}

export const LineSwitch = React.memo(_LineSwitch)
