import { createStandardAction } from "typesafe-actions";
import { registerHandler } from "../handleAction";
import WrappedState from "../../types/WrappedState";
import { Pos } from "~types";
import { createEntityFromTemplate } from "~lib/entities";

const setDoor = createStandardAction("setDoor")<{
  pos: Pos;
  door: boolean;
  skipRefresh?: boolean;
}>();
export default setDoor;

function setDoorHandler(
  state: WrappedState,
  action: ReturnType<typeof setDoor>,
): void {
  const existingDoor = state.select
    .entitiesAtPosition(action.payload.pos)
    .find((e) => e.door);

  if (action.payload.door === Boolean(existingDoor)) {
    return;
  }

  if (existingDoor) {
    state.act.removeEntity(existingDoor.id);
  } else {
    state.act.setWall({
      pos: action.payload.pos,
      wall: true,
      skipRefresh: action.payload.skipRefresh,
    });
    state.act.addEntity(
      createEntityFromTemplate("DOOR", { pos: action.payload.pos }),
    );
  }

  if (!action.payload.skipRefresh) {
    state.act.refreshTile(action.payload.pos);
  }

  state.act.playerTookTurn();
}

registerHandler(setDoorHandler, setDoor);
