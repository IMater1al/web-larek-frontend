import { IContactPopup, IOrderData, IPopup } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export default class ContactPopup implements IContactPopup {
	content: HTMLElement;
	data: IOrderData;
	phoneInput: HTMLInputElement;
	emailInput: HTMLInputElement;
	submitButton: HTMLButtonElement;
	emailRegexp: RegExp;
	phoneRegexp: RegExp;

	constructor(protected popup: IPopup, protected events: IEvents) {
		this.content = cloneTemplate('#contacts');
		this.emailInput = ensureElement<HTMLInputElement>('[name = email]', this.content);
		this.phoneInput = ensureElement<HTMLInputElement>('[name = phone]', this.content);
		this.submitButton = ensureElement<HTMLButtonElement>('[type = submit]', this.content);
		this.data = new Map();
		this.emailRegexp = /^\S+@\S+\.\S+$/;
		this.phoneRegexp = /^(\+7)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s\\-]?[0-9]{2}[\s\\-]?[0-9]{2}$/;
		this._setEventListeners();
	}

	_handleEmailInput() {
		this._checkValidation();
	}

	_handlePhoneInput() {
		this._checkValidation();
	}

	_setEventListeners() {
		this.emailInput.addEventListener('keyup', this._handleEmailInput.bind(this));
		this.phoneInput.addEventListener('keyup', this._handlePhoneInput.bind(this));
		this.submitButton.addEventListener('click', this._handleSubmit.bind(this));
	}

	_checkValidation() {
		if (this.emailRegexp.test(this.emailInput.value) && this.phoneRegexp.test(this.phoneInput.value)) {
			this.submitButton.disabled = false;
		} else {
			this.submitButton.disabled = true;
		}
	}

	reset() {
		this.emailInput.value = '';
		this.phoneInput.value = '';
		this._checkValidation();
	}

	_handleSubmit(evt: MouseEvent) {
		evt.preventDefault();
		this.data.set(this.emailInput.name, this.emailInput.value);
		this.data.set(this.phoneInput.name, this.phoneInput.value);

		this.events.emit('contact:makeorder', this.data);
	}

	render(): void {
		this.popup.render(this.content);
	}
}
