import express, { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import TilesRoutes from "./Tile/Routes";
const router = Router();

const port = process.env.API_PORT;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
router.get("/", (request: any, response: any) => {
  response.json({ message: "deu tudo certo!" });
  return response.status(200);
});

app.use(cors(corsOptions));
app.use(express.json());

app.use(router);
app.use(TilesRoutes);

app.listen(port, () => {
  console.log("API UP! Port:" + port);
});
