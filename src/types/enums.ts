export enum InteractionEnum {
	AddShips = 'add_ships',
	Attack = 'attack', //coordinates of shot and status
	AddUserToRoom = 'add_user_to_room', // add yourself to somebody's room, then remove the room from available rooms list
	CreateGame = 'create_game', //send for both players in the room, after they are connected to the room
	CreateRoom = 'create_room', //Create new room (create game room and add yourself there)
	Finish = 'finish', // id of the winner
	RandomAttack = 'randomAttack',
	Reg = 'reg',
	SinglePlay = 'single_play',
	StartGame = 'start_game', //send for both players in the room, after they are connected to the room
	Turn = 'turn', //who is shooting now
	UpdateRoom = 'update_room', //send rooms list, where only one player inside
	UpdateWinners = 'update_winners',
}

export enum ShipStatus {
	Killed = 'killed',
	Shot = 'shot',
}

export enum AttackResult {
	Killed = 'killed',
	Shot = 'shot',
	Miss = 'miss',
}
