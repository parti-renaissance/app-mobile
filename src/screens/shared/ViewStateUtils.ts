import { GenericErrorMapper } from './ErrorMapper'
import { ViewState } from './ViewState'

export const ViewStateUtils = {
  networkError: <T>(error: Error, onRetry?: () => void): ViewState<T> => {
    return ViewState.Error(GenericErrorMapper.mapErrorMessage(error), onRetry)
  },
}
