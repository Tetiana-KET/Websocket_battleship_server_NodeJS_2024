import { WebSocket } from 'ws';
import { DB } from '../store/store';
import { updateRooms } from '../controllers/updateRooms';
import { printMessageToConsole } from './printMessageToConsole';
import { updateWinners } from '../controllers/updateWinners';
import { generateWsServerResponse } from './generateWsServerResponse';
import { InteractionEnum } from '../types/enums';

export function handleConnectionClose(
	ws: WebSocket,
	disconnectedPlayerId: string
) {
	printMessageToConsole(
		`The player ${DB.playerData.get(disconnectedPlayerId)?.name} with ID: "${disconnectedPlayerId}" disconnected!`,
		'warn'
	);

	const disconnectedPlayer = DB.playerData.get(disconnectedPlayerId);

	if (disconnectedPlayer && disconnectedPlayer.rooms) {
		DB.roomData.delete(disconnectedPlayer.rooms[0]);
	}

	const game = Array.from(DB.gameData.values()).find(game =>
		game.players.includes(disconnectedPlayerId)
	);

	if (game) {
		const connectedUserId = game.players.find(
			id => id !== disconnectedPlayerId
		);

		if (connectedUserId) {
			const finishResponse = generateWsServerResponse(
				InteractionEnum.Finish,
				JSON.stringify({ winPlayer: connectedUserId })
			);
			game?.players.forEach(playerId => {
				DB.wsDB.get(playerId)?.send(finishResponse);
			});

			const winner = DB.playerData.get(connectedUserId);

			if (winner) {
				winner.winsCount += 1;
			}
			DB.gameData.delete(game.gameId);
			updateWinners();
			printMessageToConsole(
				`User ${winner?.name} won the game!\nWinner ID: ${connectedUserId}`,
				'success'
			);
		}
	}

	if (disconnectedPlayerId && game) {
		DB.playerData.delete(disconnectedPlayerId);
		DB.wsDB.delete(disconnectedPlayerId);
		DB.gameData.delete(game.gameId);
		updateRooms();
	}
	ws.close();
}
