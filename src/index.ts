import './scss/styles.scss';
import { Api } from './components/base/api';
import { ApiOrderResponse, ApiProductResponse, IOrderData, Product } from './types';
import Page from './components/Page';
import CardView from './components/CardView';
import { EventEmitter } from './components/base/events';
import BasketPopup from './components/BasketPopup';
import BasketModel from './components/BasketModel';
import Popup from './components/Popup';
import CardPopup from './components/CardPopup';
import CardModel from './components/CardModel';
import BasketItemView from './components/BasketItemView';
import OrderPopup from './components/OrderPopup';
import UserModel from './components/UserModel';
import ContactPopup from './components/ContactPopup';
import SuccessPopup from './components/SuccessPopup';

const api = new Api(process.env.API_ORIGIN);
// const catalog = new CatalogView();
const events = new EventEmitter();
const popup = new Popup(events);
const page = new Page(events);
const basketModel = new BasketModel(events);
const cardModel = new CardModel(events);
const userModel = new UserModel(events, api);
const basketPopup = new BasketPopup(popup, events);
const cardPopup = new CardPopup(popup, events);
const orderPopup = new OrderPopup(popup, events);
const contactPopup = new ContactPopup(popup, events);
const successPopup = new SuccessPopup(popup);

api.get('/api/weblarek/product').then((data: ApiProductResponse) => {
	cardModel.setItems(data.items);
	page.catalog = cardModel.items.map((card) => new CardView(events).render(card));
});

events.on('basket:card-add', (data: Product) => {
	basketModel.add(data);
});

events.on('basket:card-remove', (data: Product) => {
	basketModel.remove(data);
});

//--------------------------------------
events.on('basketpopup:open', (data: Product[]) => {
	basketPopup.render(
		data.map((card, index) => new BasketItemView(events).render(card, index)),
		basketModel.getBasketPrice()
	);
});

events.on('cardpopup:open', (data: Product) => {
	cardPopup.render(data);
});

events.on('orderpopup:open', () => {
	orderPopup.render();
});

events.on('сontactpopup:open', () => {
	contactPopup.render();
});

//--------------------------------------------

events.on('basket:select', () => {
	basketModel.changed();
});

events.on('card:select', (data: Product) => {
	cardModel.setCardPreview(data);
});

events.on('order:select', () => {
	userModel.setOrderPreview();
	userModel.setName({ items: basketModel.getBasketItems().map((el) => el.id) });
});

events.on('contact:select', (data: IOrderData) => {
	userModel.setName({ address: data.get('address') });
	userModel.setName({ payment: data.get('payment') });
	userModel.setContactPreview();
});

events.on('contact:makeorder', (data: IOrderData) => {
	userModel.setName({ phone: data.get('phone') });
	userModel.setName({ email: data.get('email') });
	userModel.setName({ total: basketModel.getBasketPrice() });
	userModel
		.makeOrder()
		.then((res: ApiOrderResponse) => {
			successPopup.render(res);
			basketModel.reset();
			page.counter = 0;
			contactPopup.reset();
			orderPopup.reset();
		})
		.catch((err) => console.error(err));
});

//---------------------------------

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

//----------------------------------------------

events.on('page:counter', (data: Map<Product, number>) => {
	page.counter = data.size;
});
