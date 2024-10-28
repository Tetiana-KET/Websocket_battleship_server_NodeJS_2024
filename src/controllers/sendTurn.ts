import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { RandomAttackRequest } from '../types/interfaces';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { validateIsBot } from '../utils/validateIsBot';
import { randomAttackHandler } from './randomAttackHandler';

export function sendTurn(currentPlayerId: string, gameId: string) {
	const turnData = {
		currentPlayer: currentPlayerId,
	};

	const response = generateWsServerResponse(
		InteractionEnum.Turn,
		JSON.stringify(turnData)
	);

	DB.gameData
		.get(gameId)
		?.players?.forEach(playerId => DB.wsDB.get(playerId)?.send(response));

	const isBot = validateIsBot(currentPlayerId);
	if (isBot) {
		const data: RandomAttackRequest = {
			gameId,
			indexPlayer: currentPlayerId,
		};
		setTimeout(() => {
			randomAttackHandler(JSON.stringify(data));
		}, 300);
	}

	const name = DB.playerData.get(currentPlayerId)?.name;
	printMessageToConsole(`Player with name: ${name} now goes!`);
}
