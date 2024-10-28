import { Ship } from '../models/Ship';
import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { ServerAddShipsResponseData, ShipInterface } from '../types/interfaces';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { sendTurn } from './sendTurn';

export function addShips(data: string) {
	const { gameId, ships, indexPlayer }: ServerAddShipsResponseData =
		JSON.parse(data);

	const userShips: ShipInterface[] = [];

	ships.forEach(ship => userShips.push(new Ship(ship)));

	const game = DB.gameData.get(gameId);

	if (game) {
		game.addPlayerShips(indexPlayer, userShips);
		printMessageToConsole(
			`Ships added!\nPlayers ships: ${JSON.stringify(userShips)}\n`,
			'success'
		);
	}

	if (game?.ships.size === 2) {
		const { players } = game;
		players.forEach(playerId => {
			const curPlayerShips = game.ships.get(playerId);
			const addShipsData = {
				gameId,
				curPlayerShips,
				currentPlayerIndex: playerId,
			};

			const response = generateWsServerResponse(
				InteractionEnum.StartGame,
				JSON.stringify(addShipsData)
			);

			DB.wsDB.get(playerId)?.send(response);

			printMessageToConsole(
				`Start The game with ID: ${gameId} for player ${DB.playerData.get(playerId)?.name}\n`,
				'success'
			);
		});
		game.turn = players[0];
		sendTurn(game.turn, gameId);
	}
}
