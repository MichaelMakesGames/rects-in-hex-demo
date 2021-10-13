import { rangeTo } from "~lib/math";

export default rangeTo(64)
  .map((i) => ({
    id: `wall_${i}`,
    x: i % 8,
    y: Math.floor(i / 8),
  }))
  .concat([
    { x: 0, y: 8, id: "door_center" },
    { x: 1, y: 8, id: "door_top" },
    { x: 2, y: 8, id: "door_bottom" },
    { x: 3, y: 8, id: "door_tall" },
  ]);
