import { COLORS } from '../consts/colors';

export function printMessageToConsole(
	text: string,
	color: keyof typeof COLORS = 'default'
) {
	console.log(`${COLORS[color]}${text}${COLORS.reset}`);
}
