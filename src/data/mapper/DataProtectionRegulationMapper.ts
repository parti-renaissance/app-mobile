import { DataProtectionRegulation } from "../../core/entities/DataProtectionRegulation";
import { RestDataProtectionRegulation } from "../restObjects/RestRestDataProtectionRegulation";

export const DataProtectionRegulationMapper = {
  map: (restGdpr: RestDataProtectionRegulation): DataProtectionRegulation => {
    return {
      content: restGdpr.content,
    };
  },
};
