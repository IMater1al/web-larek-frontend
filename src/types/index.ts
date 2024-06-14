export interface IPopup {
	container: HTMLElement | null;
	content: HTMLElement | null;
	closeButton: HTMLButtonElement;

	render(markup: HTMLElement): void;
	close(e: Event): void;
}

export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
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

export interface ICatalogView {
	container: HTMLElement;
	render(data: ApiProductResponse): void;
}

export interface IBasketPopup {
	content: HTMLElement;
	basketList: HTMLElement;
	basketPrice: HTMLElement;
	render(data?: HTMLElement[]): void;
}

export interface IBasketModel {
	items: Map<Product, number>;
	add(element: Product): void;
	getBasketPrice(): number;
	remove(element: Product): void;
	changed(): void;
}
//---------------------------------------------------------
// export interface Item {
// 	id: string;
// 	description: string;
// 	image: string;
// 	title: string;
// 	category: string;
// 	price: number;
// }

// export type paymentMethod = 'online' | 'cash';

// export interface OrderInfo {
// 	payment: paymentMethod;
// 	email: string;
// 	phone: string;
// 	address: string;
// 	total: number;
// 	items: string[];
// }

// export interface ICardModel {
// 	items: Item[];
// 	setItems(items: Item[]): void;
// 	getItem(id: string): Item;
// 	setCardPreview(data: Item): void;
// }

// export interface IBasketModel {
// 	items: Item[];
// 	add(id: number): void;
// 	remove(id: number): void;
// 	change(): void;
// 	setBasketPreview(): void;
// }

// export interface IUserModel {
// 	info: OrderInfo;
// 	setPayment(value: string): void;
// 	setEmail(value: string): void;
// 	setPhone(value: string): void;
// 	setAddress(value: string): void;
// 	setTotal(value: number): void;
// 	setItems(value: string[]): void;
// }
// export interface Popup {
// 	render(data: HTMLElement): void;
// }

// export interface IBasketPopup {
// 	basketContainer: HTMLElement;
// 	getMarkup(data: Item[]): HTMLElement;
// 	render(data: Item[]): void;
// }

// export interface ICardPopup {
// 	cardContainer: HTMLElement;
// 	getMarkup(data: Item): HTMLElement;
// 	render(data: Item): void;
// }

// export interface IOrderPopup {
// 	getMarkup(): HTMLElement;
// 	render(): void;
// }

// export interface IContactPopup {
// 	cardContainer: HTMLElement;
// 	getMarkup(data: Item): HTMLElement;
// 	render(data: Item): void;
// }

// export interface ISuccessPopup {
// 	getMarkup(total: number): HTMLElement;
// 	render(total: number): void;
// }

// export interface ICatalogView {
// 	getMarkup(data: Item[]): HTMLElement;
// 	render(data: Item[]): void;
// }
