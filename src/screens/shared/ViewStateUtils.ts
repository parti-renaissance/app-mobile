import { GenericErrorMapper } from './ErrorMapper'
import { ViewState } from './StatefulView'

export const ViewStateUtils = {
  networkError: <T>(error: Error, onRetry?: () => void): ViewState.Type<T> => {
    return new ViewState.Error(
      GenericErrorMapper.mapErrorMessage(error),
      onRetry,
    )
  },
}
