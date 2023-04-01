const DRONE_MODELS = [
  "Lightweight",
  "Middleweight",
  "Cruiserweight",
  "Heavyweight",
];
const DRONE_STATUSES = [
  "IDLE",
  "LOADING",
  "LOADED",
  "DELIVERING",
  "DELIVERED",
  "RETURNING",
];
const DRONE_WEIGHT_LIMIT = 500; // Maximum weight limit for drone

class Drone {
  constructor({ serialNumber, model, weightLimit, batteryCapacity, state }) {
    this.serialNumber = serialNumber;
    this.model = model;
    this.weightLimit = weightLimit;
    this.batteryCapacity = batteryCapacity;
    this.state = state;
    this.loadedMedications = [];
  }

  validate() {
    if (!this.serialNumber || this.serialNumber.length > 100) {
      throw new Error("Invalid serial number");
    }
    if (!DRONE_MODELS.includes(this.model)) {
      throw new Error("Invalid drone model");
    }
    if (this.weightLimit <= 0 || this.weightLimit > DRONE_WEIGHT_LIMIT) {
      throw new Error("Invalid weight limit");
    }
    if (this.batteryCapacity < 0 || this.batteryCapacity > 100) {
      throw new Error("Invalid battery capacity");
    }
    if (!DRONE_STATUSES.includes(this.state)) {
      throw new Error("Invalid drone state");
    }
  }
}

export default Drone;
