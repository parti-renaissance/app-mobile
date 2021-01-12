import React from 'react'
import ErrorView from './ErrorView'
import LoadingView from './LoadingView'

export module ViewState {
  export class Error {
    public constructor(
      readonly errorMessage: string,
      readonly onRetry?: () => void,
    ) {}
  }
  export class Loading {}
  export class Content<T> {
    public constructor(readonly content: T) {}
  }
  export type Type<T> =
    | ViewState.Error
    | ViewState.Content<T>
    | ViewState.Loading
}

type Props<T> = Readonly<{
  state: ViewState.Type<T>
  contentComponent: (value: T) => JSX.Element
}>

export const StatefulView = <T,>(props: Props<T>) => {
  const currentState = props.state
  if (currentState instanceof ViewState.Loading) {
    return <LoadingView />
  } else if (currentState instanceof ViewState.Error) {
    return <ErrorView state={currentState} />
  } else if (currentState instanceof ViewState.Content) {
    return props.contentComponent(currentState.content)
  } else {
    // unreachable
    return null
  }
}
