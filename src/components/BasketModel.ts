import { IBasketModel, Product } from '../types';
import { IEvents } from './base/events';

export default class BasketModel implements IBasketModel {
	items: Map<Product, number> = new Map();

	constructor(protected events: IEvents) {
		this.events = events;
	}

	add(element: Product) {
		if (this.items.has(element)) {
			this.items.set(element, this.items.get(element) + 1);
		} else {
			this.items.set(element, 1);
		}
		this.changed();
	}

	remove(element: Product) {
		this.items.delete(element);
		this.changed();
	}

	reset() {
		this.items.clear();
	}

	getBasketItems(): Product[] {
		const products: Product[] = [];

		this.items.forEach((_, key) => {
			products.push(key);
		});

		return products;
	}

	isAlreadyInBasket(item: Product) {
		return this.items.has(item);
	}

	getBasketPrice(): number {
		const total: Array<number> = [];
		this.items.forEach((count, product) => {
			total.push(product.price * count);
		});

		return total.reduce((prev, curr) => prev + curr, 0);
	}

	changed() {
		this.events.emit('page:counter', this.items);
		this.events.emit('basketpopup:open', this.items.keys());
	}
}
