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
  const generators = [
    new ROT.Map.Digger(width, height, { dugPercentage: 20 }),
    new ROT.Map.DividedMaze(width, height),
    new ROT.Map.Rogue(width, height, {}),
    new ROT.Map.Uniform(width, height, { roomDugPercentage: 30 }),
  ];
  const generator = ROT.RNG.getItem(generators) || generators[0];
  generator.create((x, y, content) => {
    state.act.setWall({
      pos: { x: x - 15, y: y - 10 },
      wall: Boolean(content),
      skipRefresh: true,
    });
  });
  state.act.refreshAllTiles();
}

registerHandler(generateMapHandler, generateMap);
