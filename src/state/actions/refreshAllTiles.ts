import { createStandardAction } from "typesafe-actions";
import { registerHandler } from "../handleAction";
import WrappedState from "../../types/WrappedState";

const refreshAllTiles = createStandardAction("refreshAllTiles")();
export default refreshAllTiles;

function refreshAllTilesHandler(
  state: WrappedState,
  action: ReturnType<typeof refreshAllTiles>,
): void {
  state.select.entitiesWithComps("pos", "wall").forEach(({ pos }) => {
    state.act.refreshTile(pos);
  });
}

registerHandler(refreshAllTilesHandler, refreshAllTiles);
