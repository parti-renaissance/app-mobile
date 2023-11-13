import { HeaderInfos } from "../../core/entities/HeaderInfos";
import { RestHeaderInfos } from "../restObjects/RestHeaderInfos";

export const HeaderInfosMapper = {
  map: (restHeader: RestHeaderInfos): HeaderInfos => {
    return {
      prefix: restHeader.prefix,
      slogan: restHeader.slogan,
      content: restHeader.content,
      imageUri: restHeader.image_url !== null ? restHeader.image_url : undefined,
    };
  },
};
