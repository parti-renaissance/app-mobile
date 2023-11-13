import { Poll } from "../../core/entities/Poll";
import i18n from "../../utils/i18n";
import { PollRowViewModel } from "./PollRowViewModel";

export const PollRowViewModelMapper = {
  map: (poll: Poll): PollRowViewModel => {
    const pollImages = [
      require("../../assets/images/pollImage01.jpg"),
      require("../../assets/images/pollImage02.jpg"),
      require("../../assets/images/pollImage03.jpg"),
      require("../../assets/images/pollImage04.jpg"),
      require("../../assets/images/pollImage05.jpg"),
    ];
    const pollImage = pollImages[poll.id % pollImages.length];
    return {
      id: poll.uuid,
      image: pollImage,
      title: poll.name,
      subtitle: i18n.t("polls.question_count_format", {
        count: poll.questions.length,
      }),
      tag: poll.type.toString(),
    };
  },
};
