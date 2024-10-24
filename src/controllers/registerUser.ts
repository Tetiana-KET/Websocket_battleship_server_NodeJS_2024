import { USER_EXIST } from '../consts/messages';
import { User } from '../models/User';
import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { ServerRegResponse, UserInterface } from '../types/interfaces';
import { generateWsServerResponce } from '../utils/generateWsServerResponce';
import { printMessageToConsole } from '../utils/printMessageToConsole';
import { validateIsNameVacant } from '../utils/validateIsNameVacant';

export function registerUser(id: string, data: string) {
	const { name, password } = JSON.parse(data);
	printMessageToConsole(
		`Player registered! Name: ${name}; Password: ${password};`,
		'request'
	);

	const users: UserInterface[] = Array.from(DB.playerData.values())
	const IsNameVacant = validateIsNameVacant(users, name)

	if (IsNameVacant) {
		DB.playerData.set(id, new User(name, password, id))
	}

	const userData: ServerRegResponse = {
		name: name,
		index: id,
		error: !IsNameVacant,
		errorText: IsNameVacant ? '' : USER_EXIST
	};
	
	const response = generateWsServerResponce(InteractionEnum.Reg, JSON.stringify(userData));

	DB.wsDB.get(id)?.send(response)
}
