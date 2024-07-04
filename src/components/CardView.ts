import { ICardView, Product } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { CDN_URL, categoryType } from '../utils/constants';

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

	_setCategoryClass(data: string) {
		this.category.classList.add(`${categoryType[data]}`);
	}

	_getFullImageUrl(link: string): string {
		return CDN_URL + link;
	}

	render(data: Product): HTMLElement {
		this._setCategoryClass(data.category);
		this.category.textContent = data.category;
		this.title.textContent = data.title;
		this.image.src = this._getFullImageUrl(data.image);
		this.price.textContent = `${data.price ?? 0} синапсов`;

		this._setEventListeners(data);

		return this.container;
	}
}
