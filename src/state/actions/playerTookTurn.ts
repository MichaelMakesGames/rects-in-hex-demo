import { createStandardAction } from "typesafe-actions";
import { save } from "~lib/gameSave";
import { registerHandler } from "~state/handleAction";
import WrappedState from "~types/WrappedState";

const playerTookTurn = createStandardAction("PLAYER_TOOK_TURN")();
export default playerTookTurn;

function playerTookTurnHandler(
  state: WrappedState,
  action: ReturnType<typeof playerTookTurn>,
): void {
  save(state.raw);
}

registerHandler(playerTookTurnHandler, playerTookTurn);
