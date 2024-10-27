import { DB } from '../store/store';
import { InteractionEnum, ShipStatus } from '../types/enums';
import { GameInterface, ShipInterface } from '../types/interfaces';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { updateWinners } from './updateWinners';

export function handleIsWinner(
	gameId: string,
	indexPlayer: string,
	game: GameInterface,
	opponentShips: ShipInterface[]
) {
	const isWinner = opponentShips?.every(
		ship => ship.getStatus() === ShipStatus.Killed
	);

	if (isWinner) {
		const finishResponse = generateWsServerResponse(
			InteractionEnum.Finish,
			JSON.stringify({ winPlayer: indexPlayer })
		);

		game?.players.forEach(playerId => {
			DB.wsDB.get(playerId)?.send(finishResponse);
		});

		const winner = DB.playerData.get(indexPlayer);
		if (winner) {
			winner.winsCount += 1;
		}
		DB.gameData.delete(gameId);
		printMessageToConsole(
			`User ${winner?.name} won the game!\nWinner ID: ${indexPlayer}`,
			'success'
		);
		updateWinners();
	}
}
