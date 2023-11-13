import { Department } from "../../core/entities/Department";
import { RestDepartmentResponse } from "../restObjects/RestDepartmentResponse";
import { RegionMapper } from "./RegionMapper";

export const DepartmentMapper = {
  map: (restDepartment: RestDepartmentResponse): Department => {
    return {
      name: restDepartment.name,
      code: restDepartment.code,
      region: RegionMapper.map(restDepartment.region),
    };
  },
};
