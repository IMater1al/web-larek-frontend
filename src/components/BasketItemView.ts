import { IBasketItemView, Product } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class BasketItemView implements IBasketItemView {
	container: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	deleteButton: HTMLButtonElement;
	index: HTMLElement;

	constructor(protected events: IEvents) {
		this.container = cloneTemplate('#card-basket');
		this.title = ensureElement<HTMLElement>('.card__title', this.container);
		this.price = ensureElement<HTMLElement>('.card__price', this.container);
		this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
		this.index = ensureElement<HTMLElement>('.basket__item-index', this.container);
	}

	_setEventListeners(data: Product) {
		this.deleteButton.addEventListener('click', (e) => {
			this.events.emit('basket:card-remove', data);
			e.stopPropagation();
		});
	}

	render(data: Product, index: number): HTMLElement {
		this.title.textContent = data.title;
		this.price.textContent = `${data.price ?? 0} синапсов`;
		this.index.textContent = `${index}`;

		this._setEventListeners(data);

		return this.container;
	}
}
