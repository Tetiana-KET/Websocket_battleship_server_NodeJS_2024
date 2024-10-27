import { RandomAttackRequest, AttackRequest } from '../types/interfaces';
import { DB } from '../store/store';
import { attackHandler } from './attackHandler';
import { generateRandomCoordinates } from '../utils/generateRandomCoordinates';

export function randomAttackHandler(data: string) {
	const { gameId, indexPlayer }: RandomAttackRequest = JSON.parse(data);
	const game = DB.gameData.get(gameId);

	const opponentId = game?.players.find(playerId => playerId !== indexPlayer);
	const opponentBoard = opponentId
		? game?.gameBoard.get(opponentId)
		: undefined;

	let coordinates: [number, number] = generateRandomCoordinates();

	if (opponentBoard) {
		while (opponentBoard.has(`${coordinates[0]}-${coordinates[1]}`)) {
			coordinates = generateRandomCoordinates();
		}
	}

	const [x, y] = coordinates;

	const attackData: AttackRequest = {
		gameId,
		x,
		y,
		indexPlayer,
	};

	attackHandler(JSON.stringify(attackData));
}
