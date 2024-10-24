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

export interface UserInterface {
	name: string;
	password: string;
 }

export interface GameBoardInterface { }

export interface ShipsInterface { }

export interface GameRoomInterface {
	players: UserInterface[];
	gameBoard: GameBoardInterface;
	ships: ShipsInterface;
}
