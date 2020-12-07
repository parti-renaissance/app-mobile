import { Poll } from '../../core/entities/Poll'
import i18n from '../../utils/i18n'
import { PollRowViewModel } from './PollRowViewModel'
import Theme from '../../themes/Theme'

export const PollRowViewModelMapper = {
  map: (theme: Theme, poll: Poll): PollRowViewModel => {
    const pollImages = [
      theme.image.pollImage1,
      theme.image.pollImage2,
      theme.image.pollImage3,
      theme.image.pollImage4,
    ]
    const pollImage = pollImages[poll.id % pollImages.length]
    return {
      id: poll.id.toString(),
      image: pollImage(),
      title: poll.name,
      subtitle: i18n.t('polls.question_count_format', {
        count: poll.questions.length,
      }),
      tag: poll.type.toString(),
    }
  },
}
