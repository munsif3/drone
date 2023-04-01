import express from "express";
import {
  getAvailableDrones,
  getBatteryLevel,
  getLoadedMedications,
  loadDrone,
  registerDrone,
} from "../controllers/drones.js";

const router = express.Router();

router.post("/", registerDrone);
router.put("/:id/load", loadDrone);
router.get("/:id/load", getLoadedMedications);
router.get("/available", getAvailableDrones);
router.get("/:id/battery", getBatteryLevel);

export default router;
