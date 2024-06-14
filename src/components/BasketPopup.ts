import { cloneTemplate, ensureElement } from '../utils/utils';
import { IBasketModel, IBasketPopup, IPopup } from '../types/index';
import { IEvents } from './base/events';

export default class BasketPopup implements IBasketPopup {
	content: HTMLElement;
	basketList: HTMLElement;
	basketPrice: HTMLElement;

	constructor(protected popup: IPopup, protected events: IEvents, protected basketModel: IBasketModel) {
		this.content = cloneTemplate('#basket');
		this.basketList = ensureElement('.basket__list', this.content);
		this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.content);
	}

	render(data?: HTMLElement[]) {
		if (data) {
			this.basketList.replaceChildren(...data);
			this.basketPrice.textContent = `${this.basketModel.getBasketPrice()} синапсов`;
		}
		this.popup.render(this.content);
	}
}
