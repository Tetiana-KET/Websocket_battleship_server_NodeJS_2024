export enum InteractionEnum {
	Reg = 'reg',
	CreateGame = 'create_game',
	StartGame = 'start_game',
	Turn = 'turn', //who is shooting now
	Attack = 'attack', //coordinates of shot and status
	Finish = 'finish', // id of the winner
}
