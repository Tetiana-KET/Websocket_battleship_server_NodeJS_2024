import { ShipStatus } from '../types/enums';
import { ShipInterface, ShipPosition } from '../types/interfaces';

export class Ship {
	public position: ShipPosition;
	public direction: boolean;
	public length: number;
	public type: 'small' | 'medium' | 'large' | 'huge';
	public shipCellStatus: Map<string, boolean>;

	constructor(ship: ShipInterface) {
		this.position = ship.position;
		this.direction = ship.direction;
		this.length = ship.length;
		this.type = ship.type;
		this.shipCellStatus = new Map<string, boolean>();
		this.generateShip();
	}

	private generateShip() {
		for (let i = 0; i < this.length; i++) {
			if (this.direction) {
				// true - vertical
				this.shipCellStatus.set(
					`${this.position.x}-${this.position.y + i}`,
					false
				);
			} else {
				this.shipCellStatus.set(
					`${this.position.x + i}-${this.position.y}`,
					false
				);
			}
		}
	}

	public getStatus() {
		const values: boolean[] = Array.from(this.shipCellStatus.values());
		return values.every(value => value === true)
			? ShipStatus.Killed
			: ShipStatus.Shot;
	}
}
