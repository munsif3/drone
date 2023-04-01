import express from "express";
import json from "body-parser";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

const db = new LowSync(new JSONFileSync("../../db/db.json"));

const app = express();
const port = 3000;

app.use(json());

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
