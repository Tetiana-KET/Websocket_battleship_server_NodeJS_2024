import WebSocket from 'ws';
import { v4 as generateID } from 'uuid';
import { RequestType } from '../types/interfaces';
import { InteractionEnum } from '../types/enums';
import { DB } from '../store/store';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { registerUser } from '../controllers/registerUser';
import { createNewRoom } from '../controllers/createNewRoom';
import { addUserToRoom } from '../controllers/addUserToRoom';
import { addShips } from '../controllers/addShips';
import { attackHandler } from '../controllers/attackHandler';

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

		DB.wsDB.set(idPlayer, ws);

		ws.on('message', message => {
			try {
				const { type, data }: RequestType = JSON.parse(message.toString());

				printMessageToConsole(`Received request of type: "${type}"`, 'request');

				switch (type) {
					case InteractionEnum.Reg:
						registerUser(idPlayer, data);
						break;
					case InteractionEnum.CreateRoom:
						createNewRoom(idPlayer);
						break;
					case InteractionEnum.addUserToRoom:
						addUserToRoom(idPlayer, data);
						break;
					case InteractionEnum.AddShips:
						addShips(data);
						break;
					case InteractionEnum.Attack:
						attackHandler(data);
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
