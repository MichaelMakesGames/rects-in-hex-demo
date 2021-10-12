import { createStandardAction } from "typesafe-actions";
import { Pos } from "~types";
import WrappedState from "../../types/WrappedState";
import { registerHandler } from "../handleAction";

const toggleWall = createStandardAction("toggleWall")<Pos>();
export default toggleWall;

function toggleWallHandler(
  state: WrappedState,
  action: ReturnType<typeof toggleWall>,
): void {
  const existingWall = state.select
    .entitiesAtPosition(action.payload)
    .find((e) => e.wall);
  state.act.setWall({
    pos: action.payload,
    wall: !existingWall,
  });
}

registerHandler(toggleWallHandler, toggleWall);
