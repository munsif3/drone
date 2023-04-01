
# Drone Service API

This is a REST API service that allows clients to communicate with a fleet of 10 drones, each capable of carrying medication items.

## Prerequisites
  
- Node.js v14 or later

- npm v7 or later

## Getting Started


1. Clone this repository: `git clone https://github.com/munsif3/drone.git`

2. Install dependencies: `npm install`

3. Start the server: `npm start`

The service will be available at http://localhost:3000.


## Usages

### Endpoints
-  POST 
	- "/drones/" - Registers a drone
- PUT
	- "/drones/:id/load" - Loads a drone
- GET
	- "/drones/:id/load" - Get the loaded medication
	- "/drones/available" - Get the available drones
	- "/drones/:id/battery" - Get battery level
  

## License

  

This project is licensed under the MIT License. See the LICENSE file for more details.