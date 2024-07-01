import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class Page {
	_counter: HTMLElement;
	_catalog: HTMLElement;
	_wrapper: HTMLElement;
	_basket: HTMLElement;

	constructor(protected events: IEvents) {
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:select');
		});
	}

	set counter(value: number) {
		this._counter.textContent = `${value}`;
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
