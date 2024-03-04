import Database from "../Infra/Database";
import { Tile } from "./Tile";

import ActionRepository from "../Action/Repository";
export default class TileRepository {
  database: Database;
  constructor(database: Database) {
    this.database = database;
  }

  async getAll({ onlyIds = false }): Promise<Tile[]> {
    const query = onlyIds ? "id" : "*";
    const result = await this.database.query<Tile>(
      `SELECT ${query} FROM reader_dungeon.Tile`
    );
    if (onlyIds) {
      return result;
    }
    return await Promise.all(
      result.map(async (tile) => {
        return await this.populateActions(tile);
      })
    );
  }
  async getById(id: number): Promise<Tile> {
    const result = await this.database.query<Tile>(
      `SELECT * FROM reader_dungeon.Tile WHERE id = ${id}`
    );
    if (result.length === 0) {
      throw new Error("Tile not found");
    }
    return await this.populateActions(result[0]);
  }

  async create(tile: Tile): Promise<Tile> {
    const result = await this.database.query<Tile>(
      `INSERT INTO reader_dungeon.Tile (title, text, treasures) VALUES ('${tile.title}', '${tile.text}', '${tile.treasures}');`
    );
    return result[0];
  }

  async populateActions(tile: Tile): Promise<Tile> {
    const actions = await new ActionRepository(this.database).getAllByTileId(
      tile.id ?? 0
    );
    tile.actions = actions;
    return tile;
  }
}
