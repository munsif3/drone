import express from "express";
import json from "body-parser";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

import droneRoutes from "./routes/drones.js";

const db = new LowSync(new JSONFileSync("../../db/db.json"));

const app = express();
const port = 3000;

app.use(json());

app.use("/drones", droneRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
