/**
 * @format
 */

import "react-native";
import React from "react";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import App from "../App";

// (Pierre Felgines) 06.11.2020 https://github.com/facebook/jest/issues/6434
beforeEach(() => {
  jest.useFakeTimers();
});

it("renders correctly", () => {
  renderer.create(<App />);
});
