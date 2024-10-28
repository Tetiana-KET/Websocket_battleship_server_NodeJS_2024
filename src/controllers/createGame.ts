import { Game } from '../models/Game';
import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';

//send for both players in the room, after they are connected to the room
export function createGame(indexRoom: string) {
	const game = new Game();

	DB.roomData.get(indexRoom)?.players.forEach(player => {
		game.addPlayer(player.id);

		const createGameData = {
			idGame: game.gameId,
			idPlayer: player.id,
		};

		const response = generateWsServerResponse(
			InteractionEnum.CreateGame,
			JSON.stringify(createGameData)
		);

		DB.wsDB.get(player.id)?.send(response);

		player.rooms.forEach(room => DB.roomData.delete(room));
		player.clearRoom();
	});
	DB.gameData.set(game.gameId, game);
	return game.gameId;
}
