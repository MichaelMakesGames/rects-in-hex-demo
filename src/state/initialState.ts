import { VERSION } from "~constants";
import { RawState } from "~types";

export function createInitialState() {
  const initialState: RawState = {
    version: VERSION,
    level: 0,
    entities: {},
    entitiesByPosition: {},
    entitiesByComp: {},
    cursorPos: null,
  };

  return initialState;
}
