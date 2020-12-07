import { Department } from '../../core/entities/Department'
import { RegionMapper } from './RegionMapper'
import { RestDepartmentResponse } from '../restObjects/RestDepartmentResponse'

export const DepartmentMapper = {
  map: (restDepartment: RestDepartmentResponse): Department => {
    return {
      name: restDepartment.name,
      code: restDepartment.code,
      region: RegionMapper.map(restDepartment.region),
    }
  },
}
