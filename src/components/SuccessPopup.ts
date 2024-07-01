import { ApiOrderResponse, IPopup, ISuccessPopup } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export default class SuccessPopup implements ISuccessPopup {
	content: HTMLElement;
	writeOff: HTMLElement;
	closeButton: HTMLButtonElement;

	constructor(protected popup: IPopup) {
		this.content = cloneTemplate('#success');
		this.writeOff = ensureElement<HTMLElement>('.order-success__description', this.content);
		this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.content);
		this._setEventListeners();
	}

	_handleSubmit() {
		this.popup.close();
	}

	_setEventListeners() {
		this.closeButton.addEventListener('click', this._handleSubmit.bind(this));
	}

	render(data: ApiOrderResponse): void {
		this.writeOff.textContent = `Списано ${data.total} синапсов`;
		this.popup.render(this.content);
	}
}
