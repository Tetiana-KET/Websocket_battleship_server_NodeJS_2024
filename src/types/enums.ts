export enum InteractionEnum {
	Reg = 'reg',
	CreateGame = 'create_game', //send for both players in the room, after they are connected to the room
	CreateRoom = 'create_room', //Create new room (create game room and add yourself there)
	addUserToRoom = 'add_user_to_room', // add yourself to somebody's room, then remove the room from available rooms list
	AddShips = 'add_ships',
	StartGame = 'start_game', //send for both players in the room, after they are connected to the room
	UpdateRoom = 'update_room', //send rooms list, where only one player inside
	Turn = 'turn', //who is shooting now
	Attack = 'attack', //coordinates of shot and status
	Finish = 'finish', // id of the winner
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
