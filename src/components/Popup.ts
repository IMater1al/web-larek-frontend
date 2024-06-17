import { IPopup } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class Popup implements IPopup {
	container: HTMLElement | null;
	content: HTMLElement | null;
	closeButton: HTMLButtonElement;

	constructor(protected events: IEvents) {}

	_setEventListeners() {
		this.closeButton.addEventListener('click', this.close.bind(this));
	}

	render(markup: HTMLElement): void {
		this.container = ensureElement<HTMLElement>('#modal-container');
		this.content = ensureElement<HTMLElement>('.modal__content', this.container);
		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
		this._setEventListeners();
		this.content.replaceChildren(markup);
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
		console.log(this.container.firstChild.nextSibling);
	}

	close(): void {
		this.content.firstChild.remove(); // очищаем контент из соответствующего div
		this.container.firstChild.nextSibling.replaceWith(this.container.firstChild.nextSibling.cloneNode(true)); // клонируем ноду и заменяем оригинал копией, чтобы сбросить с нее все слушатели событий

		this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
	}
}
