import React from "react";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";
import { ViewState } from "./ViewState";

type Props<T> = Readonly<{
  state: ViewState<T>;
  contentComponent: (value: T) => JSX.Element;
}>;

export const StatefulView = <T,>(props: Props<T>) => {
  const currentState = props.state;
  switch (currentState.state) {
    case "content":
      return props.contentComponent(currentState.content);
    case "loading":
      return <LoadingView />;
    case "error":
      return <ErrorView state={currentState} />;
  }
};
