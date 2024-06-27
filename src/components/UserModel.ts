import { Api } from './base/api';
import { IEvents } from './base/events';

export interface userOrderData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IUserModel {
	userFormData: Partial<userOrderData>;
	setOrderPreview(): void;
	setName(data: Partial<userOrderData>): void;
	getFormData(): Partial<userOrderData>;
}

export default class UserModel implements IUserModel {
	userFormData: Partial<userOrderData>;

	constructor(protected events: IEvents, protected api: Api) {}

	setName(data: Partial<userOrderData>) {
		this.userFormData = { ...this.userFormData, ...data };
	}

	getFormData(): Partial<userOrderData> {
		return this.userFormData;
	}

	setOrderPreview() {
		this.events.emit('orderpopup:open');
	}

	makeOrder() {
		return this.api.post('/api/weblarek/order', this.userFormData);
	}

	setContactPreview() {
		this.events.emit('сontactpopup:open');
	}
}
