import { ICardView, Product } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class CardView implements ICardView {
	container: HTMLElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;

	constructor(protected events: IEvents) {
		this.container = cloneTemplate('#card-catalog');
		this.category = ensureElement('.card__category', this.container);
		this.title = ensureElement('.card__title', this.container);
		this.image = ensureElement<HTMLImageElement>('.card__image', this.container);
		this.price = ensureElement('.card__price', this.container);
	}

	_setEventListeners(data: Product) {
		this.container.addEventListener('click', (e) => {
			this.events.emit('card:select', data);
			e.stopPropagation();
		});
	}

	render(data: Product): HTMLElement {
		this.category.textContent = data.category;
		this.title.textContent = data.title;
		this.image.src = data.image;
		this.price.textContent = `${data.price ?? 0} синапсов`;

		this._setEventListeners(data);

		return this.container;
	}
}
