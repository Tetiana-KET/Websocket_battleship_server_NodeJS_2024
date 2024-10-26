export function getSurroundingCoordinates(shipCoordinates: [number, number][]) {
	const surroundingCoordinates: [number, number][] = [];

	shipCoordinates.forEach(([x, y]) => {
		const neighbors = [
			[x - 1, y],
			[x + 1, y],
			[x, y - 1],
			[x, y + 1],
			[x - 1, y - 1],
			[x - 1, y + 1],
			[x + 1, y - 1],
			[x + 1, y + 1],
		];
		neighbors.forEach(([nx, ny]) => {
			if (
				nx >= 0 &&
				ny >= 0 &&
				nx < 10 &&
				ny < 10 &&
				!shipCoordinates.some(([sx, sy]) => sx === nx && sy === ny)
			) {
				surroundingCoordinates.push([nx, ny]);
			}
		});
	});

	return surroundingCoordinates;
}
