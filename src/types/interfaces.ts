import { InteractionEnum } from './enums';

export interface RequestType {
	type: InteractionEnum;
	data: string;
	id: 0;
}

export interface ServerRegResponse {
	name: string;
	index: string;
	error: boolean;
	errorText: string;
}

export interface ServerUpdateRoomResponse {
	roomId: string;
	roomUsers: UserForResponse[];
}

export interface UserForResponse {
	name: string;
	index: string;
}

export interface UserInterface {
	name: string;
	password: string;
	id: string;
	addGameRoom: (id: string) => void;
}

export interface GameBoardInterface {}

export interface ShipsInterface {}

export interface GameRoomInterface {
	roomId: string;
	players: UserInterface[];
	gameBoard: GameBoardInterface;
	ships: ShipsInterface;
}
