import TileRepository from "./Repository";
import { Tile } from "./Tile";

export default class TileService {
  repository: TileRepository;
  constructor(repository: TileRepository) {
    this.repository = repository;
  }
  async getAll({ onlyIds = false }) {
    return await this.repository.getAll({ onlyIds });
  }
  async getById(id: number) {
    return await this.repository.getById(id);
  }
  async create(tile: Tile) {
    return await this.repository.create(tile);
  }
}
