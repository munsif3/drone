import express from "express";
import json from "body-parser";

import droneRoutes from "./routes/drones.js";

const app = express();
const port = 3000;

app.use(json());

app.use("/drones", droneRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
