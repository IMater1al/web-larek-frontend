export interface IPopup {
	_container: HTMLElement | null;
	_content: HTMLElement | null;
	_closeButton: HTMLButtonElement;

	render(markup: HTMLElement): void;
	close(): void;
}

export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface ISuccessPopup {
	content: HTMLElement;
	render(data: ApiOrderResponse): void;
}

export interface IContactPopup {
	content: HTMLElement;
	emailInput: HTMLInputElement;
	phoneInput: HTMLInputElement;
	submitButton: HTMLButtonElement;
	data: IOrderData;
}

export interface ICardPopup {
	content: HTMLTemplateElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;
	toBasketButton: HTMLButtonElement;
}

export interface ICardView {
	container: HTMLElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;
	render(data: Product): HTMLElement;
}

export interface IBasketItemView {
	container: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	deleteButton: HTMLButtonElement;
	render(data: Product, index: number): HTMLElement;
}

export interface ApiProductResponse {
	total: number;
	items: Product[];
}

export interface ApiOrderResponse {
	id: string;
	total: number;
}

export interface ICatalogView {
	container: HTMLElement;
	render(data: ApiProductResponse): void;
}

export interface IBasketPopup {
	content: HTMLElement;
	basketList: HTMLElement;
	basketPrice: HTMLElement;
	basketButton: HTMLButtonElement;
	render(data?: HTMLElement[]): void;
}

export interface IBasketModel {
	items: Map<Product, number>;
	add(element: Product): void;
	getBasketPrice(): number;
	remove(element: Product): void;
	changed(): void;
}

export type IOrderData = Map<string, string>;

export interface IOrderPopup {
	content: HTMLElement;
	orderButton: HTMLButtonElement;
	addressInput: HTMLInputElement;
	data: Map<string, string>;
	render(): void;
}
