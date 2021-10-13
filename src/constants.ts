import { Direction } from "~types";

export const VERSION = "1.0.0";
export const CURSOR_ID = "CURSOR";

export const MAP_WIDTH = 40;
export const MAP_HEIGHT = 40;
export const HEX_WIDTH = 24;
export const HEX_BASE_WIDTH = 12;
export const HEX_HEIGHT = 24;

export const PRIORITY_MARKER = 30;
export const PRIORITY_BUILDING_DECORATION = 20;
export const PRIORITY_BUILDING_HIGH = 15;
export const PRIORITY_BUILDING_LOW = 5;

export const TRANSPARENT = "transparent";

export const N = "N";
export const NE = "NE";
export const SE = "SE";
export const S = "S";
export const SW = "SW";
export const NW = "NW";
export const DIRECTIONS: Direction[] = [N, NE, SE, S, SW, NW];
