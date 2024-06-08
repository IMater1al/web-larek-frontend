export interface Item {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface ICard {
	cardName: string;
	cardImage: string;
	cardPrice: number;
	cardCategory: string;
	cardDescription: string;

	createCard(): HTMLElement;
	setListeners(): void;
}

export interface IBasket {
	items: Map<string, number>;
	add(id: number): void;
	remove(id: number): void;
}

export interface ItemCatalog {
	items: Item[];
	setItems(items: Item[]): void;
	getProduct(id: string): Item;
}

export interface Popup {
	open(): void;
	close(): void;
}

export type paymentMethod = 'online' | 'cash';

export interface OrderInfo {
	payment: paymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}
