import { RawState } from "~types";

export function version(state: RawState) {
  return state.version;
}

export function cursorPos(state: RawState) {
  return state.cursorPos;
}
