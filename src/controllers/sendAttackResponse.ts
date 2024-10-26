import { DB } from '../store/store';
import { AttackResult, InteractionEnum } from '../types/enums';
import { AttackRequest, GameInterface } from '../types/interfaces';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';
import { printMessageToConsole } from '../utils/printMessageToConsole';

export function sendAttackResponse(
	{ gameId, x, y, indexPlayer }: AttackRequest,
	game: GameInterface,
	attackResult: AttackResult
) {
	if (attackResult !== 'miss') {
		printMessageToConsole(
			`Attacked cell: ${x}-${y}\nAttack result: ${attackResult}`,
			'warn'
		);
	}

	const attackResponseData = {
		gameId,
		position: { x, y },
		currentPlayer: indexPlayer,
		status: attackResult,
	};
	const response = generateWsServerResponse(
		InteractionEnum.Attack,
		JSON.stringify(attackResponseData)
	);

	game?.players.forEach(playerId => {
		DB.wsDB.get(playerId)?.send(response);
	});
}
