export interface Pos {
  x: number;
  y: number;
}

export interface Display {
  tile: string | string[];
  rotation?: number;
  flipX?: boolean;
  flipY?: boolean;
  speed?: number;
  scale?: number;
  color?: string;
  priority: number;
  hasBackground?: boolean;
  discreteMovement?: boolean;
  hidden?: boolean;
}

export interface Cursor {}

export interface Door {}

export interface Wall {}

export interface Entity {
  id: string;
  parentTemplate?: TemplateName;
  template: TemplateName;

  cursor?: Cursor;
  description?: string;
  display?: Display;
  door?: Door;
  name?: string;
  pos?: Pos;
  wall?: Wall;
}
