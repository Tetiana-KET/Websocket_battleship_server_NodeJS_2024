import { USER_HAS_ROOM } from '../consts/messages';
import { Room } from '../models/Room';
import { DB } from '../store/store';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { updateRooms } from './updateRooms';

export function createNewRoom(id: string) {
	const user = DB.playerData.get(id);
	let room;
	if (user && user.rooms.length === 0) {
		room = new Room(user);
	} else {
		printMessageToConsole(USER_HAS_ROOM, 'error');
		return;
	}
	if (room && user) {
		DB.roomData.set(room.roomId, room);
		user.addGameRoom(room.roomId);
		updateRooms();
	}

	console.log(`New room was created: `, DB.roomData.get(room?.roomId || ''));
}
