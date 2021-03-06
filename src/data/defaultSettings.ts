import Settings from "~types/Settings";
import { ControlCode } from "../types/ControlCode";

const defaultSettings: Settings = {
  cursorModifierKey: "shift",
  fireKeyActivatesAiming: true,
  aimInSameDirectionToFire: false,
  unmodifiedAiming: true,
  unmodifiedBuilding: false,
  keyboardShortcuts: {
    [ControlCode.N]: ["w"],
    [ControlCode.NE]: ["e"],
    [ControlCode.SE]: ["d"],
    [ControlCode.S]: ["s"],
    [ControlCode.SW]: ["a"],
    [ControlCode.NW]: ["q"],

    [ControlCode.Menu]: ["F10"],
    [ControlCode.Menu1]: ["1"],
    [ControlCode.Menu2]: ["2"],
    [ControlCode.Menu3]: ["3"],
    [ControlCode.Menu4]: ["4"],
    [ControlCode.Menu5]: ["5"],
    [ControlCode.Menu6]: ["6"],
    [ControlCode.Menu7]: ["7"],
    [ControlCode.Menu8]: ["8"],
    [ControlCode.Menu9]: ["9"],
    [ControlCode.Menu0]: ["0"],

    [ControlCode.NewGame]: ["r"],
    [ControlCode.Wait]: ["z"],
    [ControlCode.Back]: ["`", "esc"],
    [ControlCode.Help]: ["?"],
    [ControlCode.ZoomIn]: ["+", "="],
    [ControlCode.ZoomOut]: ["-", "_"],
    [ControlCode.ToggleFullscreen]: ["F11"],
  },
};

export default defaultSettings;
