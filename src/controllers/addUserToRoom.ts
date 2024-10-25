import { USER_HAS_ROOM } from '../consts/messages';
import { Game } from '../models/Game';
import { DB } from '../store/store';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { updateRooms } from './updateRooms';

// add yourself to somebody's room, then remove the room from available rooms list
export function addUserToRoom(userId: string, data: string) {
	const { indexRoom } = JSON.parse(data);

	const room = DB.roomData.get(indexRoom);
	const user = DB.playerData.get(userId);

	const isUserInRoom = room?.players.find(player => player.id === userId);
	if (isUserInRoom) {
		printMessageToConsole(USER_HAS_ROOM, 'error');
		return;
	}

	if (user) {
		room?.addUserToRoom(user);
		printMessageToConsole(
			`Add user "${user.name}" to somebody's room with roomID: ${indexRoom}.`,
			'request'
		);
	}

	DB.roomData.delete(indexRoom);
	updateRooms();
}
