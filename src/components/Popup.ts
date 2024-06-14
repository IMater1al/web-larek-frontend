import { IPopup } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class Popup implements IPopup {
	container: HTMLElement | null;
	content: HTMLElement | null;
	closeButton: HTMLButtonElement;

	constructor(protected events: IEvents) {
		this.container = ensureElement<HTMLElement>('#modal-container');
		this.content = ensureElement<HTMLElement>('.modal__content', this.container);
		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
	}

	_setEventListeners() {
		this.closeButton.addEventListener('click', this.close.bind(this), { once: true });
	}

	render(markup: HTMLElement): void {
		this._setEventListeners();
		this.content.replaceChildren(markup);
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close(): void {
		this.content.replaceChildren();
		this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
	}
}