import { BOT_SHIPS } from '../consts/botShips';
import { Room } from '../models/Room';
import { Ship } from '../models/Ship';
import { User } from '../models/User';
import { DB } from '../store/store';
import { ShipInterface } from '../types/interfaces';
import { createGame } from './createGame';
import { updateRooms } from './updateRooms';
import { v4 as generateID } from 'uuid';

export function singlePlayHandler(idPlayer: string) {
	const room = new Room();
	const player = DB.playerData.get(idPlayer);

	const botId = generateID();
	const botData = {
		name: `Bot_${botId}`,
		password: 'password',
		id: `bot_${botId}`,
	};

	const botUser = new User(botData.name, botData.password, botData.id);

	if (player) {
		room.addUserToRoom(player);
		room.addUserToRoom(botUser);
	}
	DB.roomData.set(room.roomId, room);

	//GAME
	const gameId = createGame(room.roomId);
	const userBotShips: ShipInterface[] = [];
	BOT_SHIPS.forEach(ship => userBotShips.push(new Ship(ship)));

	DB.gameData.get(gameId)?.addPlayerShips(botData.id, userBotShips);
	DB.gameData.get(gameId)?.createGameBoard(botData.id);
	DB.gameData.get(gameId)?.ships.set(botData.id, userBotShips);

	DB.playerData.set(botData.id, botUser);

	DB.roomData.delete(room.roomId);
	updateRooms();
}
