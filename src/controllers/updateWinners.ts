import { DB } from '../store/store';
import { InteractionEnum } from '../types/enums';
import { WinnerInterface } from '../types/interfaces';
import { generateWsServerResponse } from '../utils/generateWsServerResponse';
import { printMessageToConsole } from '../utils/printMessageToConsole';

export function updateWinners() {
	const winners: WinnerInterface[] =
		Array.from(DB.playerData.values())
			.filter(user => user.winsCount > 0)
			.map(winner => ({
				name: winner.name,
				wins: winner.winsCount,
			})) || [];

	const updateWinnerResponse = generateWsServerResponse(
		InteractionEnum.UpdateWinners,
		JSON.stringify(winners)
	);

	Array.from(DB.wsDB.values()).forEach(ws => {
		ws.send(updateWinnerResponse);
	});

	printMessageToConsole(
		`Updated winners: ${JSON.stringify(winners)}`,
		'request'
	);
}
