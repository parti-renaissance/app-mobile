import React, { memo } from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { Colors, Spacing } from '../../styles'
import CardView from '../shared/CardView'
import { DoorToDoorFilterProps } from './DoorToDoor'

export const DoorToDoorFilterItem = memo(
  ({ active, onPress, filter, icon, title }: DoorToDoorFilterProps) => (
    <Pressable onPress={() => onPress(filter)}>
      <CardView
        style={styles.card}
        borderRadius={30}
        backgroundColor={
          active ? Colors.activeItemBackground : Colors.defaultBackground
        }
      >
        <View style={styles.inner}>
          {icon && <Image style={styles.icon} source={icon} />}
          <Text style={styles.text}>{title}</Text>
        </View>
      </CardView>
    </Pressable>
  ),
)

const styles = StyleSheet.create({
  card: {
    margin: Spacing.small,
  },
  icon: {
    height: 18,
    marginRight: Spacing.small,
    width: 18,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.unit + Spacing.small,
    paddingVertical: Spacing.unit,
  },
  text: {
    color: Colors.darkText,
  },
})
