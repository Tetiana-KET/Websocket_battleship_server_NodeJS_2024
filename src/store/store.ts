import { GameRoomInterface, UserInterface } from "../types/interfaces";
import WebSocket from 'ws';


type StoreDb = {
    playerData: Map<string, UserInterface>;
    roomData: Map<string, GameRoomInterface>;
    wsDB: Map<string, WebSocket>
}

export const DB: StoreDb = {
    playerData: new Map<string, UserInterface>(),
    roomData: new Map<string, GameRoomInterface>(),
    wsDB: new Map<string, WebSocket>()
}

