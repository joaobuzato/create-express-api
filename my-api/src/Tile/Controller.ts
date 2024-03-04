import Database from "../Infra/Database";
import TileRepository from "./Repository";
import TileService from "./Service";
import { Tile } from "./Tile";

export default class TileController {
  service: TileService;
  constructor() {
    const database = new Database();
    const repository = new TileRepository(database);
    this.service = new TileService(repository);
  }
  async getAll({ onlyIds = false }) {
    return await this.service.getAll({ onlyIds });
  }
  async getById(id: number) {
    return await this.service.getById(id);
  }
  async create(tile: Tile) {
    return await this.service.create(tile);
  }
}
