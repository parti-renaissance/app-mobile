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

  export const unwrap = <T,>(state: ViewState.Type<T>): T | undefined => {
    if (state instanceof ViewState.Content) {
      return state.content
    } else {
      return undefined
    }
  }

  export const map = <T, U>(
    state: ViewState.Type<T>,
    transform: (input: T) => U,
  ): ViewState.Type<U> => {
    if (state instanceof ViewState.Content) {
      return new ViewState.Content(transform(state.content))
    } else if (state instanceof ViewState.Error) {
      return new ViewState.Error(state.errorMessage, state.onRetry)
    } else if (state instanceof ViewState.Loading) {
      return new ViewState.Loading()
    } else {
      throw 'Unreachable'
    }
  }
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
