import { ShipInterface } from '../types/interfaces';

export const BOT_SHIPS: ShipInterface[] = [
	{
		position: { x: 9, y: 4 },
		direction: true,
		length: 4,
		type: 'huge',
	},
	{
		position: { x: 0, y: 2 },
		direction: true,
		length: 3,
		type: 'large',
	},
	{
		position: { x: 4, y: 5 },
		direction: false,
		length: 3,
		type: 'large',
	},
	{
		position: { x: 2, y: 0 },
		direction: false,
		length: 2,
		type: 'medium',
	},
	{
		position: { x: 7, y: 1 },
		direction: true,
		length: 2,
		type: 'medium',
	},
	{
		position: { x: 3, y: 3 },
		direction: false,
		length: 2,
		type: 'medium',
	},
	{
		position: { x: 2, y: 5 },
		direction: false,
		length: 1,
		type: 'small',
	},
	{
		position: { x: 4, y: 8 },
		direction: true,
		length: 1,
		type: 'small',
	},
	{
		position: { x: 0, y: 8 },
		direction: false,
		length: 1,
		type: 'small',
	},
	{
		position: { x: 5, y: 0 },
		direction: true,
		length: 1,
		type: 'small',
	},
];
