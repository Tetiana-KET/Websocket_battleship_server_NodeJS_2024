import {
	GameBoardInterface,
	ShipsInterface,
	UserInterface,
} from '../types/interfaces';
import { v4 as generateID } from 'uuid';

export class Room {
	public roomId: string;
	public players: UserInterface[] = [];
	public gameBoard: GameBoardInterface = {};
	public ships: ShipsInterface = {};

	constructor(user: UserInterface) {
		this.roomId = generateID();
		this.players.push(user);
	}

	public addUserToRoom(user: UserInterface) {
		this.players.push(user);
		user.addGameRoom(this.roomId);
	}
}
