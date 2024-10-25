import { USER_EXIST } from '../consts/messages';
import { User } from '../models/User';
import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { ServerRegResponse, UserInterface } from '../types/interfaces';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { validateDoesUserExist } from '../utils/validateDoesUserExist';

export function registerUser(id: string, data: string) {
	const { name, password } = JSON.parse(data);
	printMessageToConsole(
		`Player registered! Name: ${name}; Password: ${password};`,
		'request'
	);

	const users: UserInterface[] = Array.from(DB.playerData.values());
	const doesUserExist = validateDoesUserExist(users, name, id);

	if (!doesUserExist) {
		DB.playerData.set(id, new User(name, password, id));
	}

	const userData: ServerRegResponse = {
		name: name,
		index: id,
		error: doesUserExist,
		errorText: doesUserExist ? USER_EXIST : '',
	};

	const response = generateWsServerResponse(
		InteractionEnum.Reg,
		JSON.stringify(userData)
	);

	DB.wsDB.get(id)?.send(response);
}
