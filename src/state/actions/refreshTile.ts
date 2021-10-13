import { createStandardAction } from "typesafe-actions";
import {
  PRIORITY_BUILDING_DECORATION,
  PRIORITY_BUILDING_HIGH,
} from "~constants";
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

const topDoorWalls = new Set([2, 3, 32, 33, 34, 35]);
const bottomDoorWalls = new Set([4, 12, 16, 20, 24, 28]);
const tallDoorWalls = new Set([
  5,
  6,
  7,
  9,
  10,
  11,
  13,
  14,
  15,
  17,
  18,
  19,
  21,
  22,
  23,
  25,
  26,
  27,
  29,
  30,
  31,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
]);

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
  let wallNumber = 0;
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
    (["N", "NE", "SE", "S", "SW", "NW"] as Direction[]).forEach((d, i) => {
      wallNumber += hasWall(d) && !isCorner(d) ? 2 ** i : 0;
    });
    state.act.updateEntity({
      id: wall.id,
      display: {
        tile: `wall_${wallNumber}`,
        priority: PRIORITY_BUILDING_HIGH,
      },
    });
  }

  const door = state.select.entitiesAtPosition(pos).find((e) => e.door);
  if (door) {
    let doorTile = "door_center";
    if (topDoorWalls.has(wallNumber)) {
      doorTile = "door_top";
    } else if (bottomDoorWalls.has(wallNumber)) {
      doorTile = "door_bottom";
    } else if (tallDoorWalls.has(wallNumber)) {
      doorTile = "door_tall";
    }
    state.act.updateEntity({
      id: door.id,
      display: {
        tile: doorTile,
        priority: PRIORITY_BUILDING_DECORATION,
      },
    });
  }
}

registerHandler(refreshTileHandler, refreshTile);
