import Database from "../Infra/Database";
import { Action } from "./Action";

export default class TileRepository {
  database: Database;
  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<Action[]> {
    const result = await this.database.query<Action>(
      "SELECT * FROM reader_dungeon.Action "
    );

    return result;
  }
  async getAllByTileId(tileId: number): Promise<Action[]> {
    const result = await this.database.query<Action>(
      `SELECT * FROM reader_dungeon.Action WHERE tile_id = ${tileId}`
    );
    return result;
  }
}
