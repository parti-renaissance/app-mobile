import { StepType } from "../../../core/entities/StepType";

export interface PollDetailComponentProvider<T> {
  getStepComponent: (step: number) => JSX.Element;
  getNumberOfSteps: () => number;
  getStepType: (step: number) => StepType;
  isDataComplete: (step: number) => boolean;
  getResult: () => T;
}
