import { Product } from '../types';
import { IEvents } from './base/events';

export default class CardModel {
	items: Product[] = [];

	constructor(protected events: IEvents) {}

	setItems(data: Product[]) {
		this.items.push(...data);
	}

	getItem(cardId: string): Product {
		return this.items.find((element) => element.id === cardId);
	}

	setCardPreview(data: Product) {
		this.events.emit('cardpopup:open', data);
	}
}
