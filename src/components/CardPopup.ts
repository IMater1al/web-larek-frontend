import { ICardPopup, IPopup, Product } from '../types';
import { CDN_URL, categoryType } from '../utils/constants';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class CardPopup implements ICardPopup {
	content: HTMLTemplateElement;
	category: HTMLElement;
	title: HTMLElement;
	image: HTMLImageElement;
	price: HTMLElement;
	description: HTMLElement;
	toBasketButton: HTMLButtonElement;
	pickedCard: Product;

	constructor(protected popup: IPopup, protected events: IEvents) {
		this.content = cloneTemplate('#card-preview');
		this.image = ensureElement<HTMLImageElement>('.card__image', this.content);
		this.category = ensureElement<HTMLElement>('.card__category', this.content);
		this.title = ensureElement<HTMLElement>('.card__title', this.content);
		this.price = ensureElement<HTMLElement>('.card__price', this.content);
		this.description = ensureElement<HTMLElement>('.card__text', this.content);
		this.toBasketButton = ensureElement<HTMLButtonElement>('.card__button', this.content);

		this._setEventListeners();
	}

	_setEventListeners() {
		this.toBasketButton.addEventListener('click', (e) => {
			e.stopPropagation();
			this.events.emit('basket:card-add', this.pickedCard);
		});
	}

	_setCategoryClass(data: string) {
		this.category.classList.add(`${categoryType[data]}`);
	}

	_getFullImageUrl(link: string): string {
		return CDN_URL + link;
	}

	disableToBasketButton() {
		this.toBasketButton.disabled = true;
	}

	enableToBasketButton() {
		this.toBasketButton.disabled = false;
	}

	render(data: Product, isInBasket: boolean) {
		if (isInBasket || data.price === null) {
			this.disableToBasketButton();
		} else {
			this.enableToBasketButton();
		}
		this._setCategoryClass(data.category);
		this.pickedCard = data;
		this.description.textContent = data.description;
		this.image.src = this._getFullImageUrl(data.image);
		this.category.textContent = data.category;
		this.title.textContent = data.title;
		this.price.textContent = `${data.price ?? 0} синапсов`;
		this.popup.render(this.content);
	}
}
