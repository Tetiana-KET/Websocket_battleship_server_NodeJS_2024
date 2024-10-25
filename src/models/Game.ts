import { GameBoardInterface, ShipInterface } from '../types/interfaces';
import { v4 as generateID } from 'uuid';

export class Game {
	public gameBoard: GameBoardInterface;
	public ships: Map<string, ShipInterface[]>;
	public gameId: string;
	public players: string[] = [];
	public turn: string = '';

	constructor() {
		this.gameId = generateID();
		this.ships = new Map();
		this.gameBoard = new Map();
	}

	public addPlayer(playerId: string) {
		this.players.push(playerId);
	}

	public addPlayerShips(playerId: string, ships: ShipInterface[]) {
		this.ships.set(playerId, ships);
	}
}
