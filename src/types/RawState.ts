import type { Entity, Pos } from "./Entity";

export interface RawState {
  version: string;
  level: number;
  entities: Record<string, Entity>;
  entitiesByPosition: Record<string, Set<string>>;
  entitiesByComp: Record<string, Set<string>>;
  cursorPos: Pos | null;
}
