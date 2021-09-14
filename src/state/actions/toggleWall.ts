import { createStandardAction } from "typesafe-actions";
import { PRIORITY_BUILDING_HIGH } from "~constants";
import { createEntityFromTemplate } from "~lib/entities";
import {
  getAdjacentPositions,
  getHorizontallyReflectedDirection,
  getOppositeDirection,
  getRelativePosition,
  getRing,
  getVerticalDirection,
  getVerticallyReflectedDirection,
  isDiagonalDirection,
} from "~lib/geometry";
import { Direction, Pos } from "~types";
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
  if (existingWall) {
    state.act.removeEntity(existingWall.id);
  } else {
    state.act.addEntity(
      createEntityFromTemplate("WALL", { pos: action.payload }),
    );
  }

  for (const pos of [
    action.payload,
    ...getAdjacentPositions(action.payload),
    ...getRing(action.payload, 2),
  ]) {
    const wall = state.select.entitiesAtPosition(pos).find((e) => e.wall);
    const hasWall = (...directions: Direction[]) =>
      state.select
        .entitiesAtPosition(getRelativePosition(pos, directions))
        .some((e) => e.wall);
    const isCorner = (d: Direction) =>
      (isDiagonalDirection(d) &&
        hasWall("N") &&
        hasWall("S") &&
        hasWall(d, d) &&
        !hasWall(d, getVerticallyReflectedDirection(d)) &&
        hasWall(d, d, getVerticallyReflectedDirection(d)) &&
        !hasWall(getVerticallyReflectedDirection(d))) ||
      (isDiagonalDirection(d) &&
        hasWall(getOppositeDirection(d)) &&
        hasWall(getVerticallyReflectedDirection(d)) &&
        hasWall(
          getOppositeDirection(d),
          getHorizontallyReflectedDirection(d),
        ) &&
        hasWall(getVerticalDirection(d), d) &&
        !hasWall(getVerticalDirection(d)) &&
        !hasWall(getHorizontallyReflectedDirection(d)));
    if (wall) {
      let n = 0;
      (["N", "NE", "SE", "S", "SW", "NW"] as Direction[]).forEach((d, i) => {
        n += hasWall(d) && !isCorner(d) ? 2 ** i : 0;
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
