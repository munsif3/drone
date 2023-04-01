import db from "../../db/db.js";
import Drone from "../models/Drone.js";

const DB_DRONES = db.data.drones;
const DB_MEDICATIONS = db.data.medications;
const DRONE_MIN_BATTERY_LEVEL = 25;

export const registerDrone = async (req, res) => {
  const { serialNumber, model, weightLimit, batteryCapacity } = req.body;

  const droneExists = DB_DRONES.find(
    (drone) => drone.serialNumber === serialNumber
  );

  if (droneExists) {
    return res.status(400).json({ error: "Drone already exists" });
  }

  if (!serialNumber || !model || !batteryCapacity) {
    return res.status(400).send({
      error: "Serial number, model, and battery capacity are required",
    });
  }

  const state = "IDLE";
  const drone = new Drone({
    serialNumber,
    model,
    weightLimit,
    batteryCapacity,
    state,
  });

  try {
    drone.validate();
  } catch (error) {
    console.log("Registering a new drone failed: ", error);
    return res.status(400).json({ error: error.message });
  }

  DB_DRONES.push(drone);
  await db.write();
  res.status(201).json(drone);
};

export const loadDrone = async (req, res) => {
  const droneId = req.params.id;
  const medication = req.body;
  const drone = DB_DRONES.find((drone) => drone.serialNumber === droneId);

  if (!drone) {
    return res.status(404).json({ error: "Drone not found" });
  }

  if (drone.state !== "IDLE") {
    return res.status(400).json({
      error: `Drone is not available for loading. State: ${drone.state}`,
    });
  }

  if (drone.batteryCapacity < DRONE_MIN_BATTERY_LEVEL) {
    return res.status(400).json({
      error: `Drone battery level is below ${DRONE_MIN_BATTERY_LEVEL}%`,
    });
  }

  if (medication.weight > drone.weightLimit) {
    return res
      .status(400)
      .json({ error: "Medication weight exceeds drone weight limit" });
  }

  drone.state = "LOADING";
  drone.loadedMedications = [medication];
  drone.state = "LOADED";

  await db.write();

  res.json(medication);
};

export const getLoadedMedications = (req, res) => {
  const droneId = req.params.id;
  const drone = DB_DRONES.find((drone) => drone.serialNumber === droneId);

  if (!drone) {
    return res.status(404).json({ error: "Drone not found" });
  }

  if (drone.state !== "LOADED" && drone.state !== "DELIVERING") {
    return res.status(400).json({ error: "Drone is not loaded or delivering" });
  }

  res.json(drone.loadedMedications);
};

export const getAvailableDrones = (req, res) => {
  const availableDrones = DB_DRONES.filter((drone) => drone.state === "IDLE");
  res.json(availableDrones);
};

export const getBatteryLevel = (req, res) => {
  const droneId = req.params.id;
  const drone = DB_DRONES.find((drone) => drone.serialNumber === droneId);
  if (!drone) {
    return res.status(404).json({ error: "Drone not found" });
  }
  res.json({ batteryLevel: drone.batteryCapacity });
};
