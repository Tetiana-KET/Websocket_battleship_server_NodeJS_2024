import { resolve as _resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';

export const mode = process.env.NODE_ENV || 'production';
export const entry = './index.ts';
export const target = 'node';
export const output = {
	filename: 'bundle.js',
	path: _resolve(__dirname, 'dist'),
};
export const resolve = {
	extensions: ['.ts', '.js'],
};
export const module = {
	rules: [
		{
			test: /\.ts$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		},
	],
};
export const plugins = [new CleanWebpackPlugin(), new Dotenv()];
