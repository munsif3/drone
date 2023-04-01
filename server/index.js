const express = require("express");
const bodyParser = require("body-parser");
// const droneRoutes = require("./routes/drones");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// app.use("/drones", droneRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
