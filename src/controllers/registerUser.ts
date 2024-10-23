import { printMessageToConsole } from '../utils/printMessageToConsole';

export function registerUser(id: string, data: string) {
	const { name, password } = JSON.parse(data);
	printMessageToConsole(
		`Player registered! Name: ${name}; Password: ${password};`,
		'request'
	);
}
