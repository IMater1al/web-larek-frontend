import { IPopup, Product } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export interface ICardPopup {
	content: HTMLTemplateElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;
	toBasketButton: HTMLButtonElement;
}

export default class CardPopup implements ICardPopup {
	content: HTMLTemplateElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;
	toBasketButton: HTMLButtonElement;
	pickedCard: Product;

	constructor(protected popup: IPopup, protected events: IEvents) {
		this.content = cloneTemplate('#card-preview');
		this.image = ensureElement<HTMLImageElement>('.card__image', this.content);
		this.category = ensureElement<HTMLElement>('.card__category', this.content);
		this.title = ensureElement<HTMLElement>('.card__title', this.content);
		this.price = ensureElement<HTMLElement>('.card__price', this.content);
		this.toBasketButton = ensureElement<HTMLButtonElement>('.card__button', this.content);

		this._setEventListeners();
	}

	_setEventListeners() {
		this.toBasketButton.addEventListener('click', (e) => {
			e.stopPropagation();
			this.events.emit('basket:card-add', this.pickedCard);
		});
	}

	render(data: Product) {
		this.pickedCard = data;
		this.image.src = data.image;
		this.category.textContent = data.category;
		this.title.textContent = data.title;
		this.price.textContent = `${data.price ?? 0} синапсов`;
		this.popup.render(this.content);
	}
}
