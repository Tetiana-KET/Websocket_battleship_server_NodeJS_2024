## RSSchool NodeJS websocket task template

> Static http server and base task packages.
> By default WebSocket client tries to connect to the 3000 port.

## Prerequisites

- Node.js v22.9.0 or later
- Create a `.env` file and set the ws-port value (e.g., `WS_PORT=3000`). See `.env.example`

## Running the Application

- Clone this repository.
- Switch to the `develop` branch
  ```
  git switch develop
  ```
- Install dependencies
  ```
  npm install
  ```
- Set the port value in the `.env` file.
- Start the application. There are 2 modes to run the application:

**Development**

`npm run start:dev`

- Start the application in development mode with nodemon, both http and websocket servers

**Production**

`npm run start`

- Build the application (http and websocket servers)

---

**All commands**

| Command             | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `npm run start:dev` | Start the application in development mode with nodemon, both http and websocket servers |
| `npm run start`     | Build the application (http and websocket servers)                                      |

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
