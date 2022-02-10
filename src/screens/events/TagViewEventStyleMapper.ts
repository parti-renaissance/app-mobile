import { hashCode } from '../../utils/HashCode'
import { Styles } from '../../styles'
import { TextStyle } from 'react-native'

export const TagViewEventStyleMapper = {
  map: (tag: string): TextStyle => {
    const tagStyles = [Styles.eventTag1, Styles.eventTag2, Styles.eventTag3]
    return tagStyles[Math.abs(hashCode(tag)) % tagStyles.length]
  },
}
