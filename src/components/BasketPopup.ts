import { cloneTemplate, ensureElement } from '../utils/utils';
import { IBasketPopup, IPopup } from '../types/index';
import { IEvents } from './base/events';

export default class BasketPopup implements IBasketPopup {
	content: HTMLElement;
	basketList: HTMLElement;
	basketPrice: HTMLElement;
	basketButton: HTMLButtonElement;

	constructor(protected popup: IPopup, protected events: IEvents) {
		this.content = cloneTemplate('#basket');
		this.basketList = ensureElement('.basket__list', this.content);
		this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.content);
		this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.content);
		this._setEventListeners();
	}

	_setEventListeners() {
		this.basketButton.addEventListener('click', () => {
			this.events.emit('order:select');
		});
	}

	render(data?: HTMLElement[], basketPrice?: number) {
		if (data) {
			this.basketList.replaceChildren(...data);
			this.basketPrice.textContent = `${basketPrice} синапсов`;
		}
		this.popup.render(this.content);
	}
}
