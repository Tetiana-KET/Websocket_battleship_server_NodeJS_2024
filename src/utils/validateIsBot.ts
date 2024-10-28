export function validateIsBot(id: string) {
	return id.startsWith('bot_');
}
