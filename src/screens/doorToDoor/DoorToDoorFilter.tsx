import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { DisplayFilter } from '../../core/entities/DoorToDoor'
import { Colors, Spacing } from '../../styles'
import i18n from '../../utils/i18n'
import { TertiaryButton } from '../shared/Buttons'

type Props = {
  filter: DisplayFilter
  onPress: (mode: DisplayFilter) => void
}

const DoorToDoorFilter = ({ filter, onPress }: Props) => {
  return (
    <ScrollView
      horizontal
      style={{ paddingVertical: Spacing.small }}
      showsHorizontalScrollIndicator={false}
    >
      <TertiaryButton
        style={styles.container}
        title={i18n.t('doorToDoor.filter.all')}
        onPress={() => onPress('all')}
        textStyle={styles.text}
        innerStyle={[styles.inner, filter === 'all' && styles.selected]}
      />
      <TertiaryButton
        icon={require('../../assets/images/papTodoIcon.png')}
        iconTint={Colors.shipGray}
        iconPadding={Spacing.small}
        innerStyle={[styles.inner, filter === 'todo' && styles.selected]}
        onPress={() => onPress('todo')}
        style={styles.container}
        textStyle={styles.text}
        title={i18n.t('doorToDoor.filter.to_do')}
      />
      <TertiaryButton
        style={styles.container}
        title={i18n.t('doorToDoor.filter.to_finish')}
        onPress={() => onPress('tofinish')}
        textStyle={styles.text}
        icon={require('../../assets/images/papToFinishIcon.png')}
        iconTint={Colors.shipGray}
        iconPadding={Spacing.small}
        innerStyle={[styles.inner, filter === 'tofinish' && styles.selected]}
      />
      <TertiaryButton
        style={styles.container}
        title={i18n.t('doorToDoor.filter.finished')}
        onPress={() => onPress('finished')}
        textStyle={styles.text}
        icon={require('../../assets/images/papDoneIcon.png')}
        iconTint={Colors.shipGray}
        iconPadding={Spacing.small}
        innerStyle={[styles.inner, filter === 'finished' && styles.selected]}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.small,
  },
  inner: {
    paddingHorizontal: Spacing.margin,
  },
  selected: {
    backgroundColor: Colors.springWood,
  },
  text: {
    color: Colors.shipGray,
  },
})

export default DoorToDoorFilter
