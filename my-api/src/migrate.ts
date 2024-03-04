import migrate from "quick-migrate-lib";
import config from "../config/index";

const sqlFile = "./src/Infra/Scripts/reader_dungeon.sql";

migrate(sqlFile, config.sqlConnection);
