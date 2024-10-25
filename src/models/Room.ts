import { UserInterface } from '../types/interfaces';
import { v4 as generateID } from 'uuid';

export class Room {
	public roomId: string;
	public players: UserInterface[] = [];

	constructor(user: UserInterface) {
		this.roomId = generateID();
		this.players.push(user);
	}

	public addUserToRoom(user: UserInterface) {
		this.players.push(user);
		user.addGameRoom(this.roomId);
	}
}
