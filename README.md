## RSSchool NodeJS websocket task template

> Static http server served on http://localhost:8181
> By default WebSocket client tries to connect to the 3000 port.

## Prerequisites

- Node.js v22.9.0 or later
- Create a `.env` file and set the ws-port value (e.g., `WS_PORT=3000`). See `.env.example`

## Running the Application

1. Clone this repository.

2. Switch to the `develop` branch

```
git switch develop
```

3. Install dependencies

```
npm install
```

4. Set the port value in the `.env` file.

5. Start the application: You can run the application in two modes:

**Development**

```
npm run start:dev
```

- Starts the application in development mode using nodemon.
- Automatically restarts the server when code changes are detected.
- Launches both the HTTP and WebSocket servers, allowing you to test real-time and standard request-response functionalities in development.

**Production**

```
npm start
```

- Starts the application in production mode.
  - Builds the application by running the build script (compile/transpile source code).
  - Starts the application by running the generated code (dist/bundle.js) with Node.js.

---

**All commands**

| Command             | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `npm run start:dev` | Start the application in development mode with nodemon, both http and websocket servers |
| `npm run start`     | Build the application (http and websocket servers)                                      |

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
