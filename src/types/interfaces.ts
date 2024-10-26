import { InteractionEnum, ShipStatus } from './enums';

// SERVER INTERACTIONS: RES-REQ

export interface RequestType {
	type: InteractionEnum;
	data: string;
	id: 0;
}

export interface ServerAddShipsResponseData {
	gameId: string;
	ships: ShipInterface[];
	indexPlayer: string;
}

export interface ServerRegResponseData {
	name: string;
	index: string;
	error: boolean;
	errorText: string;
}

export interface ServerUpdateRoomResponseData {
	roomId: string;
	roomUsers: UserResponseData[];
}

export interface AttackRequest {
	gameId: string;
	x: number;
	y: number;
	indexPlayer: string;
}

export interface ServerAttackResponse {
	position: ShipPosition;
	currentPlayer: string;
	status: 'miss' | 'killed' | 'shot';
}

// USER
export interface UserResponseData {
	name: string;
	index: string;
}

export interface UserInterface {
	name: string;
	password: string;
	id: string;
	rooms: string[];
	addGameRoom: (id: string) => void;
	clearRoom: () => void;
}

// ROOM
export interface RoomInterface {
	roomId: string;
	players: UserInterface[];
	addUserToRoom: (user: UserInterface) => void;
}

// GAME

export interface PlayerBoardInterface extends Map<string, boolean> {}

export interface GameBoardInterface extends Map<string, PlayerBoardInterface> {}

export interface ShipPosition {
	x: number;
	y: number;
}

export interface ShipInterface {
	position: ShipPosition;
	direction: boolean;
	type: 'small' | 'medium' | 'large' | 'huge';
	length: number;
	shipCellStatus: Map<string, boolean>;
	getStatus: () => ShipStatus;
}

export interface GameInterface {
	gameId: string;
	gameBoard: GameBoardInterface;
	ships: Map<string, ShipInterface[]>;
	players: string[];
	turn: string;
	addPlayer: (playerId: string) => void;
	addPlayerShips: (playerId: string, ships: ShipInterface[]) => void;
	createGameBoard: (playerId: string) => void;
}
