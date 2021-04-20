import { TagViewModel } from './TagViewModel'
import { hashCode } from '../../utils/HashCode'
import { Styles } from '../../styles'

export const TagViewModelMapper = {
  map: (tag: string): TagViewModel => {
    const tagStyles = [Styles.eventTag1, Styles.eventTag2, Styles.eventTag3]
    const tagStyle = tagStyles[Math.abs(hashCode(tag)) % tagStyles.length]
    return {
      label: tag,
      textColor: tagStyle.textColor,
      backgroundColor: tagStyle.backgroundColor,
    }
  },
}
