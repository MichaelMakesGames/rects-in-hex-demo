import { createStandardAction } from "typesafe-actions";
import { createEntityFromTemplate } from "~lib/entities";
import { rangeFromTo } from "~lib/math";
import renderer from "~renderer";
import { registerHandler } from "~state/handleAction";
import { createInitialState } from "~state/initialState";
import WrappedState from "~types/WrappedState";

const newGame = createStandardAction("NEW_GAME")();
export default newGame;

function newGameHandler(
  state: WrappedState,
  action: ReturnType<typeof newGame>,
): void {
  state.setRaw(createInitialState());
  renderer.clear();

  for (const x of rangeFromTo(-15, 15)) {
    for (const y of rangeFromTo(-10, 10)) {
      state.act.addEntity(createEntityFromTemplate("FLOOR", { pos: { x, y } }));
    }
  }

  state.act.loadGame({ state: state.raw });
}

registerHandler(newGameHandler, newGame);
