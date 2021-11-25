import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Spacing } from '../../styles'
import i18n from '../../utils/i18n'
import { DoorToDoorDisplayFilterDisplay } from './DoorToDoor'
import { DoorToDoorFilterItem } from './DoorToDoorFilterItem'

type Props = {
  filter: DoorToDoorDisplayFilterDisplay
  onPress: (mode: DoorToDoorDisplayFilterDisplay) => void
}

const DoorToDoorFilter = ({ filter, onPress }: Props) => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      <DoorToDoorFilterItem
        filter="all"
        title={i18n.t('doorToDoor.filter.all')}
        onPress={() => onPress('all')}
        active={filter === 'all'}
      />
      <DoorToDoorFilterItem
        filter="todo"
        icon={require('../../assets/images/papTodoIcon.png')}
        title={i18n.t('doorToDoor.filter.to_do')}
        onPress={() => onPress('todo')}
        active={filter === 'todo'}
      />
      <DoorToDoorFilterItem
        filter="tofinish"
        icon={require('../../assets/images/papToFinishIcon.png')}
        title={i18n.t('doorToDoor.filter.to_finish')}
        onPress={() => onPress('tofinish')}
        active={filter === 'tofinish'}
      />
      <DoorToDoorFilterItem
        filter="finished"
        icon={require('../../assets/images/papDoneIcon.png')}
        title={i18n.t('doorToDoor.filter.finished')}
        onPress={() => onPress('finished')}
        active={filter === 'finished'}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.small,
  },
})

export default DoorToDoorFilter
