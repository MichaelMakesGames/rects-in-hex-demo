import { rangeTo } from "~lib/math";

export default rangeTo(64).map((i) => ({
  id: `wall_${i}`,
  x: i % 8,
  y: Math.floor(i / 8),
}));
