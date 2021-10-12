import { createStandardAction } from "typesafe-actions";
import { PRIORITY_BUILDING_HIGH } from "~constants";
import {
  getHorizontallyReflectedDirection,
  getOppositeDirection,
  getRelativePosition,
  getVerticalDirection,
  getVerticallyReflectedDirection,
  isDiagonalDirection,
} from "~lib/geometry";
import { Direction, Pos } from "~types";
import WrappedState from "../../types/WrappedState";
import { registerHandler } from "../handleAction";

const refreshTile = createStandardAction("refreshTile")<Pos>();
export default refreshTile;

function refreshTileHandler(
  state: WrappedState,
  action: ReturnType<typeof refreshTile>,
): void {
  const pos = action.payload;
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
      hasWall(getOppositeDirection(d), getHorizontallyReflectedDirection(d)) &&
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

registerHandler(refreshTileHandler, refreshTile);
