import { Room } from '../models/Room';
import { DB } from '../store/store';
import { updateRooms } from './updateRooms';

export function createNewRoom(id: string) {
	const user = DB.playerData.get(id);
	let room;
	if (user) {
		room = new Room(user);
	}
	if (room && user) {
		DB.roomData.set(room.roomId, room);
		user.addGameRoom(room.roomId);
		updateRooms();
	}

	console.log(`New room was created: `, DB.roomData.get(room?.roomId || ''));
}
