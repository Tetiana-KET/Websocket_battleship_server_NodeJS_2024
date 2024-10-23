import WebSocket from 'ws';
import { v4 as generateID } from 'uuid';
import { config } from 'dotenv';
import { httpServer } from './src/http_server/index.js';
import { DEFAULT_HTTP_PORT, DEFAULT_WS_PORT } from './src/consts/defaultPort';
import { WS_PORT_MSG, HTTP_PORT_MSG } from './src/consts/consoleMessages';
import { printMessageToConsole } from './src/utils/printMessageToConsole';
import { RequestType } from './src/types/interfaces';

config();

const HTTP_PORT = process.env.HTTP_PORT || DEFAULT_HTTP_PORT;
const WS_PORT = process.env.WS_PORT || DEFAULT_WS_PORT;

httpServer.listen(HTTP_PORT);
const websocketServer = new WebSocket.Server({ port: +WS_PORT });

printMessageToConsole(`${HTTP_PORT_MSG}${HTTP_PORT}`, 'info');
printMessageToConsole(`${WS_PORT_MSG}${WS_PORT}`, 'info');

websocketServer.on('connection', ws => {
	const idPlayer = generateID();
	printMessageToConsole(
		`New player with ID: "${idPlayer}" connected!`,
		'success'
	);

	ws.on('message', message => {
		const { type, data }: RequestType = JSON.parse(message.toString());
		printMessageToConsole(`Received request of type: "${type}"`, 'request');
		printMessageToConsole(`User registration Data: ${data}`, 'request');
	});

	ws.on('close', () => {
		printMessageToConsole(
			`The player with ID: "${idPlayer}" disconnected!`,
			'warn'
		);
	});
	ws.on('error', error => {
		printMessageToConsole(`WebSocket error: ${error.message}`, 'error');
	});
});
