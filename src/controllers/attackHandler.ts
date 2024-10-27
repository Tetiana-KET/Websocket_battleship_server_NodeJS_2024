import { DB } from '../store/store';
import { AttackResult, ShipStatus } from '../types/enums';
import { AttackRequest } from '../types/interfaces';
import { getSurroundingCoordinates } from '../utils/getSurroundingCoordinates';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { handleIsWinner } from './handleIsWinner';
import { sendAttackResponse } from './sendAttackResponse';
import { sendTurn } from './sendTurn';

export function attackHandler(data: string) {
	const { gameId, x, y, indexPlayer }: AttackRequest = JSON.parse(data);
	const game = DB.gameData.get(gameId);

	if (game?.turn !== indexPlayer) {
		return;
	}
	const opponentId = game?.players.find(playerId => playerId !== indexPlayer);
	const opponentBoard = game?.gameBoard.get(opponentId || '');
	const opponentShips = game?.ships.get(opponentId || '');
	const ship = opponentShips?.find(ship =>
		ship.shipCellStatus.has(`${x}-${y}`)
	);

	if (!ship) {
		opponentBoard?.set(`${x}-${y}`, true);
		sendAttackResponse({ gameId, x, y, indexPlayer }, game, AttackResult.Miss);

		printMessageToConsole(
			`Attacked cell: ${x}-${y}\nAttack result: ${AttackResult.Miss}`,
			'warn'
		);

		if (opponentId && game) {
			game.turn = opponentId;
			sendTurn(game.turn, gameId);
		}
		return;
	}

	ship.shipCellStatus.set(`${x}-${y}`, true);
	const shipStatus = ship.getStatus();

	if (game) {
		game.turn = indexPlayer;
		sendTurn(game.turn, gameId);
	}

	switch (shipStatus) {
		case ShipStatus.Shot:
			opponentBoard?.set(`${x}-${y}`, true);
			sendAttackResponse(
				{ gameId, x, y, indexPlayer },
				game,
				AttackResult.Shot
			);

			break;
		case ShipStatus.Killed:
			opponentBoard?.set(`${x}-${y}`, true);

			sendAttackResponse(
				{ gameId, x, y, indexPlayer },
				game,
				AttackResult.Killed
			);

			const shipCoordinates = Array.from(ship.shipCellStatus.keys()).map(
				key => key.split('-').map(Number) as [number, number]
			);

			const surroundingCoordinates = getSurroundingCoordinates(shipCoordinates);

			surroundingCoordinates.forEach(([sx, sy]) => {
				opponentBoard?.set(`${sx}-${sy}`, true);
				sendAttackResponse(
					{ gameId, x: sx, y: sy, indexPlayer },
					game,
					AttackResult.Miss
				);
			});

			/**WINNERS */
			if (opponentShips) {
				handleIsWinner(gameId, indexPlayer, game, opponentShips);
			}

			break;
	}
}
