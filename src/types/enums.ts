export enum InteractionEnum {
	Reg = 'reg',
	CreateGame = 'create_game',
	CreateRoom = 'create_room', //Create new room (create game room and add yourself there)
	StartGame = 'start_game', //send for both players in the room, after they are connected to the room
	UpdateRoom = 'update_room', //send rooms list, where only one player inside
	Turn = 'turn', //who is shooting now
	Attack = 'attack', //coordinates of shot and status
	Finish = 'finish', // id of the winner
}
