import { IOrderData, IOrderPopup, IPopup } from '../types';
import { cloneTemplate, ensureAllElements, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class OrderPopup implements IOrderPopup {
	content: HTMLElement;
	orderButton: HTMLButtonElement;
	orderButtons: HTMLButtonElement[];
	addressInput: HTMLInputElement;
	data: IOrderData;

	constructor(protected popup: IPopup, protected events: IEvents) {
		this.data = new Map();
		this.content = cloneTemplate('#order');
		this.addressInput = ensureElement<HTMLInputElement>('.form__input', this.content);
		this.orderButton = ensureElement<HTMLButtonElement>('.order__button', this.content);
		this.orderButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.content);
		this._setEventListeners();
	}

	_handleClick(evt: MouseEvent) {
		if (evt.target instanceof HTMLButtonElement) {
			evt.target.classList.add('button_alt-active');
			this.data.set('payment', evt.target.name);
			this.orderButtons
				.filter((el) => evt.target !== el)
				.forEach((button) => {
					button.classList.remove('button_alt-active');
				});
		}
		this._checkValidation();
	}

	_handleInput() {
		this._checkValidation();
	}

	_setEventListeners() {
		this.orderButtons.forEach((elem: HTMLButtonElement) => {
			elem.addEventListener('click', this._handleClick.bind(this));
		});
		this.addressInput.addEventListener('keyup', this._handleInput.bind(this));
		this.orderButton.addEventListener('click', this._handleOrder.bind(this));
	}

	_checkValidation() {
		if (this.data.has('payment') && this.addressInput.validity.valid) {
			this.orderButton.disabled = false;
		} else {
			this.orderButton.disabled = true;
		}
	}

	_handleOrder(evt: MouseEvent) {
		evt.preventDefault();
		this.data.set(this.addressInput.name, this.addressInput.value);
		this.events.emit('contact:select', this.data);
	}

	reset() {
		this.addressInput.value = '';
		this.orderButtons.forEach((button) => {
			button.classList.remove('button_alt-active');
		});
		this._checkValidation();
	}

	render(): void {
		this.addressInput.required = true;
		this.popup.render(this.content);
	}
}
