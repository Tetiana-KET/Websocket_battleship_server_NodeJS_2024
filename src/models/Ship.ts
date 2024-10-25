import { ShipInterface, ShipPosition } from '../types/interfaces';

export class Ship {
	public position: ShipPosition;
	public direction: boolean;
	public length: number;
	public type: 'small' | 'medium' | 'large' | 'huge';

	constructor(ship: ShipInterface) {
		this.position = ship.position;
		this.direction = ship.direction;
		this.length = ship.length;
		this.type = ship.type;
	}
}
