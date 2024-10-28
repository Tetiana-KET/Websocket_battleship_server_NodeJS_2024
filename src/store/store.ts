import {
	GameInterface,
	RoomInterface,
	UserInterface,
} from '../types/interfaces';
import WebSocket from 'ws';

type StoreDb = {
	playerData: Map<string, UserInterface>;
	roomData: Map<string, RoomInterface>;
	gameData: Map<string, GameInterface>;
	wsDB: Map<string, WebSocket>;
};

export const DB: StoreDb = {
	playerData: new Map<string, UserInterface>(),
	roomData: new Map<string, RoomInterface>(),
	gameData: new Map<string, GameInterface>(),
	wsDB: new Map<string, WebSocket>(),
};
