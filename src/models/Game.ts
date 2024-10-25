import { GameBoardInterface, ShipsInterface } from '../types/interfaces';
import { v4 as generateID } from 'uuid';

export class Game {
	public gameBoard: GameBoardInterface = {};
	public ships: ShipsInterface = {};
	public idGame: string;
	public players: string[] = [];
	public turn: string = '';
	constructor() {
		this.idGame = generateID();
	}

	public addPlayer(playerId: string) {
		this.players.push(playerId);
	}
}
