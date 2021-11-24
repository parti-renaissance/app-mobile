import React from 'react'
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { DisplayFilter } from '../../core/entities/DoorToDoor'
import { Colors, Spacing } from '../../styles'
import i18n from '../../utils/i18n'
import CardView from '../shared/CardView'

type Props = {
  filter: DisplayFilter
  onPress: (mode: DisplayFilter) => void
}

type ItemProps = {
  filter: DisplayFilter
  active: boolean
  title: string
  icon?: ImageSourcePropType
  onPress: (mode: DisplayFilter) => void
}

const FilterItem = (props: ItemProps) => (
  <Pressable onPress={() => props.onPress(props.filter)}>
    <CardView
      style={styles.card}
      borderRadius={30}
      backgroundColor={
        props.active ? Colors.springWood : Colors.defaultBackground
      }
    >
      <View style={styles.inner}>
        {props.icon && <Image style={styles.icon} source={props.icon} />}
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </CardView>
  </Pressable>
)

const DoorToDoorFilter = ({ filter, onPress }: Props) => {
  return (
    <ScrollView
      horizontal
      style={{ paddingVertical: Spacing.small }}
      showsHorizontalScrollIndicator={false}
    >
      <FilterItem
        filter="all"
        title={i18n.t('doorToDoor.filter.all')}
        onPress={() => onPress('all')}
        active={filter === 'all'}
      />
      <FilterItem
        filter="todo"
        icon={require('../../assets/images/papTodoIcon.png')}
        title={i18n.t('doorToDoor.filter.to_do')}
        onPress={() => onPress('todo')}
        active={filter === 'todo'}
      />
      <FilterItem
        filter="tofinish"
        icon={require('../../assets/images/papToFinishIcon.png')}
        title={i18n.t('doorToDoor.filter.to_finish')}
        onPress={() => onPress('tofinish')}
        active={filter === 'tofinish'}
      />
      <FilterItem
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
    padding: Spacing.unit,
  },
  text: {
    color: Colors.shipGray,
  },
})

export default DoorToDoorFilter
