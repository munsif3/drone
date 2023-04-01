import { v4 as uuidv4 } from "uuid";

const drones = [];

export const registerDrone = (req, res) => {
  const drone = req.body;
  drone.serialNumber = uuidv4();
  drone.state = "IDLE";
  drones.push(drone);
  res.status(201).json(drone);
};

export const loadDrone = (req, res) => {
  const droneId = req.params.id;
  const medication = req.body;
  const drone = drones.find((drone) => drone.serialNumber === droneId);
  if (!drone) {
    return res.status(404).json({ error: "Drone not found" });
  }
  if (drone.state !== "IDLE") {
    return res
      .status(400)
      .json({ error: "Drone is not available for loading" });
  }
  if (drone.batteryCapacity < 25) {
    return res.status(400).json({ error: "Drone battery level is below 25%" });
  }
  if (medication.weight > drone.weightLimit) {
    return res
      .status(400)
      .json({ error: "Medication weight exceeds drone weight limit" });
  }
  drone.state = "LOADING";
  drone.loadedMedications = [medication];
  res.json(medication);
};

export const getLoadedMedications = (req, res) => {
  const droneId = req.params.id;
  const drone = drones.find((drone) => drone.serialNumber === droneId);
  if (!drone) {
    return res.status(404).json({ error: "Drone not found" });
  }
  if (drone.state !== "LOADED" && drone.state !== "DELIVERING") {
    return res.status(400).json({ error: "Drone is not loaded or delivering" });
  }
  res.json(drone.loadedMedications);
};

export const getAvailableDrones = (req, res) => {
  const availableDrones = drones.filter((drone) => drone.state === "IDLE");
  res.json(availableDrones);
};

export const getBatteryLevel = (req, res) => {
  const droneId = req.params.id;
  const drone = drones.find((drone) => drone.serialNumber === droneId);
  if (!drone) {
    return res.status(404).json({ error: "Drone not found" });
  }
  res.json({ batteryLevel: drone.batteryCapacity });
};
