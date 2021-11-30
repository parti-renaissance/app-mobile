import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Spacing } from '../../styles'
import i18n from '../../utils/i18n'
import { DoorToDoorFilterDisplay } from './DoorToDoor'
import { DoorToDoorFilterItem } from './DoorToDoorFilterItem'

type Props = {
  filter: DoorToDoorFilterDisplay
  onPress: (mode: DoorToDoorFilterDisplay) => void
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
        filter="ongoing"
        icon={require('../../assets/images/papToFinishIcon.png')}
        title={i18n.t('doorToDoor.filter.ongoing')}
        onPress={() => onPress('ongoing')}
        active={filter === 'ongoing'}
      />
      <DoorToDoorFilterItem
        filter="completed"
        icon={require('../../assets/images/papDoneIcon.png')}
        title={i18n.t('doorToDoor.filter.completed')}
        onPress={() => onPress('completed')}
        active={filter === 'completed'}
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
