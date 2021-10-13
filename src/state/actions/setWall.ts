import { createStandardAction } from "typesafe-actions";
import { createEntityFromTemplate } from "~lib/entities";
import { getAdjacentPositions, getRing } from "~lib/geometry";
import { Pos } from "~types";
import WrappedState from "../../types/WrappedState";
import { registerHandler } from "../handleAction";

const setWall = createStandardAction("setWall")<{
  pos: Pos;
  wall: boolean;
  skipRefresh?: boolean;
}>();
export default setWall;

function setWallHandler(
  state: WrappedState,
  action: ReturnType<typeof setWall>,
): void {
  const existingWall = state.select
    .entitiesAtPosition(action.payload.pos)
    .find((e) => e.wall);

  if (action.payload.wall === Boolean(existingWall)) {
    return;
  }

  if (existingWall) {
    state.act.removeEntity(existingWall.id);
  } else {
    state.act.addEntity(
      createEntityFromTemplate("WALL", { pos: action.payload.pos }),
    );
  }

  if (!action.payload.skipRefresh) {
    for (const pos of [
      action.payload.pos,
      ...getAdjacentPositions(action.payload.pos),
      ...getRing(action.payload.pos, 2),
      ...getRing(action.payload.pos, 3),
    ]) {
      state.act.refreshTile(pos);
    }
  }

  state.act.playerTookTurn();
}

registerHandler(setWallHandler, setWall);
