import { UserInterface } from '../types/interfaces';

export function validateDoesUserExist(
	users: UserInterface[],
	name: string,
	id: string
): boolean {
	return users.findIndex(user => user.name === name || user.id === id) > 0;
}
