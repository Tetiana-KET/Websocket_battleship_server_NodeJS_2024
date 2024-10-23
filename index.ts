import { config } from 'dotenv';
import { httpServer } from './src/http_server/index';
import { startWebSocketServer } from './src/websocket_server/index';
import { DEFAULT_HTTP_PORT, DEFAULT_WS_PORT } from './src/consts/defaultPort';
import { HTTP_PORT_MSG } from './src/consts/consoleMessages';
import { printMessageToConsole } from './src/utils/printMessageToConsole';
config();

const HTTP_PORT = process.env.HTTP_PORT || DEFAULT_HTTP_PORT;
const WS_PORT = process.env.WS_PORT || DEFAULT_WS_PORT;

httpServer.listen(HTTP_PORT);
printMessageToConsole(`${HTTP_PORT_MSG}${HTTP_PORT}`, 'info');
startWebSocketServer(+WS_PORT);
