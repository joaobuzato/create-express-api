import { Action } from "../Action/Action";
export type Tile = {
  id?: number;
  title: string;
  text: string;
  treasures: number;
  actions: Array<Action>;
};
