import { createStandardAction } from "typesafe-actions";
import * as ROT from "rot-js";
import { registerHandler } from "../handleAction";
import WrappedState from "../../types/WrappedState";

const generateMap = createStandardAction("generateMap")();
export default generateMap;

function generateMapHandler(
  state: WrappedState,
  action: ReturnType<typeof generateMap>,
): void {
  const width = 30;
  const height = 20;
  const createCallback = (x: number, y: number, content: number) => {
    state.act.setWall({
      pos: { x: x - 15, y: y - 10 },
      wall: Boolean(content),
      skipRefresh: true,
    });
    state.act.setDoor({
      pos: { x: x - 15, y: y - 10 },
      door: false,
      skipRefresh: false,
    });
  };
  const doorCallback = (x: number, y: number) => {
    state.act.setDoor({
      pos: { x: x - 15, y: y - 10 },
      door: true,
      skipRefresh: false,
    });
  };
  const generators = [
    () =>
      new ROT.Map.Digger(width, height, {
        // dugPercentage: 15,
        corridorLength: [4, 4],
      })
        .create(createCallback)
        .getRooms()
        .forEach((room) => room.getDoors(doorCallback)),
    // () => new ROT.Map.DividedMaze(width, height).create(createCallback),
  ];
  const generator = ROT.RNG.getItem(generators) || generators[0];
  generator();
  state.act.refreshAllTiles();
}

registerHandler(generateMapHandler, generateMap);
