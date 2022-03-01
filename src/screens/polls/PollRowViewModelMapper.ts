import { Poll } from '../../core/entities/Poll'
import i18n from '../../utils/i18n'
import { PollRowViewModel } from './PollRowViewModel'

export const PollRowViewModelMapper = {
  map: (poll: Poll): PollRowViewModel => {
    const pollImages = [
      require('../../assets/images/blue/imageSondage01.png'),
      require('../../assets/images/blue/imageSondage02.png'),
      require('../../assets/images/blue/imageSondage03.png'),
      require('../../assets/images/blue/imageSondage04.png'),
    ]
    const pollImage = pollImages[poll.id % pollImages.length]
    return {
      id: poll.uuid,
      image: pollImage,
      title: poll.name,
      subtitle: i18n.t('polls.question_count_format', {
        count: poll.questions.length,
      }),
      tag: poll.type.toString(),
    }
  },
}
