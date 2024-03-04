import Router from "express";

import TileController from "./Controller";
import { Tile } from "./Tile";

const TilesRoutes = Router();
const controller = new TileController();

TilesRoutes.get("/tiles", async (request, response) => {
  function boolearize(value: string | undefined): boolean {
    return value === "true";
  }
  try {
    const { onlyIds } = request.query as { onlyIds: string };

    const body = await controller.getAll({ onlyIds: boolearize(onlyIds) });
    return response.status(200).json(body);
  } catch (e) {
    return response.status(400).json({ message: "erro ao obter tiles" });
  }
});

TilesRoutes.get("/tiles/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const body = await controller.getById(Number(id));
    return response.status(200).json(body);
  } catch (e) {
    return response.status(400).json({ message: "erro ao obter tile" });
  }
});
TilesRoutes.post("/tiles/", async (request, response) => {
  try {
    const body = await controller.create(request.body as Tile);
    return response.status(200).json(body);
  } catch (e) {
    return response.status(400).json({ message: "erro ao criar tile" });
  }
});

export default TilesRoutes;
