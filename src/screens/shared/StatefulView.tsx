import React from 'react'
import ErrorView from './ErrorView'
import LoadingView from './LoadingView'

export interface ViewStateError {
  readonly errorMessage: string
  readonly onRetry?: () => void
  readonly state: 'error'
}

export interface ViewStateLoading {
  readonly state: 'loading'
}

export interface ViewStateContent<T> {
  readonly content: T
  readonly state: 'content'
}

export type ViewState<T> =
  | ViewStateContent<T>
  | ViewStateError
  | ViewStateLoading

const Error = <T,>(
  errorMessage: string,
  onRetry: (() => void) | undefined,
): ViewState<T> => {
  return { errorMessage, onRetry, state: 'error' }
}

const Loading = <T,>(): ViewState<T> => {
  return { state: 'loading' }
}

const Content = <T,>(content: T): ViewState<T> => {
  return { content: content, state: 'content' }
}

const map = <T, U>(
  viewState: ViewState<T>,
  transform: (input: T) => U,
): ViewState<U> => {
  return flatMap(viewState, (input) => {
    return ViewState.Content(transform(input))
  })
}

const flatMap = <T, U>(
  viewState: ViewState<T>,
  transform: (input: T) => ViewState<U>,
): ViewState<U> => {
  switch (viewState.state) {
    case 'error':
      return ViewState.Error(viewState.errorMessage, viewState.onRetry)
    case 'loading':
      return ViewState.Loading()
    case 'content':
      return transform(viewState.content)
  }
}

const unwrap = <T,>(viewState: ViewState<T>): T | undefined => {
  switch (viewState.state) {
    case 'error':
      return undefined
    case 'loading':
      return undefined
    case 'content':
      return viewState.content
  }
}

const merge = <T, U>(
  lhs: ViewState<T>,
  rhs: ViewState<U>,
): ViewState<{ lhs: T; rhs: U }> => {
  if (lhs.state === 'loading' || rhs.state === 'loading') {
    return Loading()
  }
  if (lhs.state === 'error') {
    return Error(lhs.errorMessage, lhs.onRetry)
  }
  if (rhs.state === 'error') {
    return Error(rhs.errorMessage, rhs.onRetry)
  }
  return Content({ lhs: lhs.content, rhs: rhs.content })
}

export const ViewState = {
  Error,
  Loading,
  Content,
  map,
  flatMap,
  unwrap,
  merge,
}

type Props<T> = Readonly<{
  state: ViewState<T>
  contentComponent: (value: T) => JSX.Element
}>

export const StatefulView = <T,>(props: Props<T>) => {
  const currentState = props.state
  switch (currentState.state) {
    case 'content':
      return props.contentComponent(currentState.content)
    case 'loading':
      return <LoadingView />
    case 'error':
      return <ErrorView state={currentState} />
  }
}
