import WebSocket from 'ws';
import { v4 as generateID } from 'uuid';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { RequestType } from '../types/interfaces';
import { RequestEnum } from '../types/enums';
import { registerUser } from '../controllers/registerUser';

export function startWebSocketServer(port: number) {
	const websocketServer = new WebSocket.Server({ port });

	printMessageToConsole(
		`WebSocket server is running on ws://localhost:${port}`,
		'info'
	);

	websocketServer.on('connection', ws => {
		const idPlayer = generateID();
		printMessageToConsole(
			`New player with ID: "${idPlayer}" connected!`,
			'success'
		);

		ws.on('message', message => {
			try {
				const { type, data }: RequestType = JSON.parse(message.toString());

				printMessageToConsole(`Received request of type: "${type}"`, 'request');

				switch (type) {
					case RequestEnum.Reg:
						registerUser(idPlayer, data);
						break;
				}
			} catch (error) {
				printMessageToConsole('Error parsing WebSocket message', 'error');
			}
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
}