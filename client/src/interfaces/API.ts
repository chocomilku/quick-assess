export interface Game {
	id: number;
	isRunning: number;
	name: string;
}

export interface Category {
	id: number;
	gameId: number;
	text: string;
	points: number;
	color: string;
}

export interface Question {
	id: number;
	gameId: number;
	categoryId: number;
	question: string;
}

export interface Logs {
	id: number;
	timestamp: string;
	action: string;
}

export interface Answer {
	id: number;
	timestamp: string;
	answer: string;
	author: string;
	isPass: number | null;
	questionId: number;
	categoryId: number;
	gameId: number;
}
