import { Required } from "Object/_api";
import { getAdjacentPositions, getPosKey } from "~lib/geometry";
import { Entity, Pos, RawState } from "~types";

export function entityList(state: RawState) {
  return Object.values(state.entities);
}

export function entitiesWithComps<C extends keyof Entity>(
  state: RawState,
  ...comps: C[]
): Required<Entity, C>[] {
  const byComps = comps
    .map((comp) => state.entitiesByComp[comp] || new Set())
    .sort((a, b) => a.size - b.size);
  const [smallest, ...rest] = byComps;
  return Array.from(smallest)
    .filter((id) => rest.every((idSet) => idSet.has(id)))
    .map((id) => state.entities[id]) as Required<Entity, C>[];
}

export function entitiesWithTemplate(state: RawState, template: TemplateName) {
  return entityList(state).filter((e) => e.template === template);
}

export function entityById(state: RawState, entityId: string) {
  return state.entities[entityId];
}

export function entitiesAtPosition(state: RawState, position: Pos) {
  const key = getPosKey(position);
  return Array.from(state.entitiesByPosition[key] || []).map(
    (id) => state.entities[id],
  ) as Required<Entity, "pos">[];
}

export function entitiesAtCursor(state: RawState) {
  const { cursorPos } = state;
  return cursorPos && entitiesAtPosition(state, cursorPos);
}

export function adjacentEntities(state: RawState, position: Pos) {
  return getAdjacentPositions(position).reduce<Entity[]>(
    (entities, adjacentPosition) =>
      entities.concat(entitiesAtPosition(state, adjacentPosition)),
    [],
  );
}

export function name(state: RawState, id: string): string {
  const entity = entityById(state, id);
  return entity.name || "Enemy";
}
