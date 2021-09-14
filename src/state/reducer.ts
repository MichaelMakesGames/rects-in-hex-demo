import { Action, RawState } from "~/types";
import { createInitialState } from "./initialState";
import wrapState from "./wrapState";

export default function reducer(
  state: RawState = createInitialState(),
  action: Action,
): RawState {
  const wrappedState = wrapState(state);
  wrappedState.handle(action);
  return wrappedState.raw;
}
