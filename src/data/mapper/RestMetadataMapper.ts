import PaginationInfo from "../../core/entities/PaginationInfo";
import { RestMetadata } from "../restObjects/RestMetadata";

export const RestMetadataMapper = {
  map: (metadata: RestMetadata): PaginationInfo => {
    return {
      currentPage: metadata.current_page,
      lastPage: metadata.last_page,
    };
  },
};
