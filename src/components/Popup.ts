import { IPopup } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class Popup implements IPopup {
	_container: HTMLElement;
	_content: HTMLElement;
	_closeButton: HTMLButtonElement;

	constructor(protected events: IEvents) {
		this._container = ensureElement<HTMLElement>('#modal-container');
		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this._container);
		this._handleCloseByClick = this._handleCloseByClick.bind(this);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._setEventListeners();
	}

	_handleCloseByClick(evt: MouseEvent) {
		if (evt.target instanceof HTMLElement) {
			if (evt.target.classList.contains('modal__close') || evt.target === evt.currentTarget) {
				this.close();
			}
		}
	}

	_handleEscClose(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	_setEventListeners() {
		this._container.addEventListener('click', this._handleCloseByClick);
		document.addEventListener('keydown', this._handleEscClose);
	}

	render(markup: HTMLElement): void {
		this._content = ensureElement<HTMLElement>('.modal__content', this._container);
		this._content.replaceChildren(markup);
		this._container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close(): void {
		this._content = null;
		// this._content.firstChild.remove();
		this._container.classList.remove('modal_active');
		this.events.emit('modal:close');
	}
}
