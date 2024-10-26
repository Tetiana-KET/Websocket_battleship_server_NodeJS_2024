import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';

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
}
