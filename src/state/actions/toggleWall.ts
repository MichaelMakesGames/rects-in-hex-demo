import { createStandardAction } from "typesafe-actions";
import { registerHandler } from "../handleAction";
import WrappedState from "../../types/WrappedState";
import { Direction, Pos } from "~types";
import { createEntityFromTemplate } from "~lib/entities";
import { getAdjacentPositions, getPositionToDirection } from "~lib/geometry";
import { PRIORITY_BUILDING_HIGH } from "~constants";

const toggleWall = createStandardAction("toggleWall")<Pos>();
export default toggleWall;

function toggleWallHandler(
  state: WrappedState,
  action: ReturnType<typeof toggleWall>,
): void {
  const existingWall = state.select
    .entitiesAtPosition(action.payload)
    .find((e) => e.wall);
  if (existingWall) {
    state.act.removeEntity(existingWall.id);
  } else {
    state.act.addEntity(
      createEntityFromTemplate("WALL", { pos: action.payload }),
    );
  }

  for (const pos of [action.payload, ...getAdjacentPositions(action.payload)]) {
    const wall = state.select.entitiesAtPosition(pos).find((e) => e.wall);
    if (wall) {
      let n = 0;
      (["N", "NE", "SE", "S", "SW", "NW"] as Direction[]).forEach((d, i) => {
        const hasWall = state.select
          .entitiesAtPosition(getPositionToDirection(pos, d))
          .some((e) => e.wall);
        n += hasWall ? 2 ** i : 0;
      });
      state.act.updateEntity({
        id: wall.id,
        display: {
          tile: `wall_${n}`,
          priority: PRIORITY_BUILDING_HIGH,
        },
      });
    }
  }

  state.act.playerTookTurn();
}

registerHandler(toggleWallHandler, toggleWall);
