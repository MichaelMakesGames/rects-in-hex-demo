import colors from "~colors";
import {
  PRIORITY_BUILDING_DECORATION,
  PRIORITY_BUILDING_HIGH,
  PRIORITY_BUILDING_LOW,
  PRIORITY_MARKER,
} from "~constants";
import { Entity } from "~types";

const templates = {
  WALL: {
    name: "Wall",
    wall: {},
    display: {
      tile: "wall_0",
      priority: PRIORITY_BUILDING_HIGH,
    },
  },
  DOOR: {
    name: "Door",
    door: {},
    display: {
      tile: "door_center",
      priority: PRIORITY_BUILDING_DECORATION,
    },
  },
  CURSOR: {
    cursor: {},
    display: {
      tile: "cursor",
      priority: PRIORITY_MARKER,
      discreteMovement: true,
    },
  },
  FLOOR: {
    display: {
      tile: "cursor",
      color: colors.gray,
      priority: PRIORITY_BUILDING_LOW,
    },
  },
} as Record<TemplateName, Partial<Entity>>;

export default templates;
