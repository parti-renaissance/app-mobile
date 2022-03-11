import { Poll } from '../../core/entities/Poll'
import i18n from '../../utils/i18n'
import { PollRowViewModel } from './PollRowViewModel'

export const PollRowViewModelMapper = {
  map: (poll: Poll): PollRowViewModel => {
    const pollImages = [
      require('../../assets/images/pollImage01.jpg'),
      require('../../assets/images/pollImage02.jpg'),
      require('../../assets/images/pollImage03.jpg'),
      require('../../assets/images/pollImage04.jpg'),
      require('../../assets/images/pollImage05.jpg'),
      require('../../assets/images/pollImage06.jpg'),
      require('../../assets/images/pollImage07.jpg'),
      require('../../assets/images/pollImage08.jpg'),
      require('../../assets/images/pollImage09.jpg'),
      require('../../assets/images/pollImage10.jpg'),
      require('../../assets/images/pollImage11.jpg'),
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
