import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { ServerUpdateRoomResponse } from '../types/interfaces';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';

export function updateRooms() {
	const rooms: ServerUpdateRoomResponse[] = Array.from(
		DB.roomData.values()
	).map(room => ({
		roomId: room.roomId,
		roomUsers: room.players.map(player => ({
			name: player.name,
			index: player.id,
		})),
	}));
	const updateRoomsResponse = generateWsServerResponse(
		InteractionEnum.UpdateRoom,
		JSON.stringify(rooms)
	);

	DB.wsDB.forEach(socket => socket.send(updateRoomsResponse));
}
