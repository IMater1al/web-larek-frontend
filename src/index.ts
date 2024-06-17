import './scss/styles.scss';
import { Api } from './components/base/api';
import { ApiProductResponse, Product } from './types';
import Page from './components/Page';
import CardView from './components/CardView';
import { EventEmitter } from './components/base/events';
import BasketPopup from './components/BasketPopup';
import BasketModel from './components/BasketModel';
import Popup from './components/Popup';
import CardPopup from './components/CardPopup';
import CardModel from './components/CardModel';
import BasketItemView from './components/BasketItemView';

const api = new Api(process.env.API_ORIGIN);
// const catalog = new CatalogView();
const events = new EventEmitter();
const popup = new Popup(events);
const page = new Page(events);
const basketModel = new BasketModel(events);
const cardModel = new CardModel(events);
const basketPopup = new BasketPopup(popup, events, basketModel);
const cardPopup = new CardPopup(popup, events);

const data: ApiProductResponse = {
	total: 1,
	items: [
		{
			id: '123123-1231-23',
			description: 'asdasdasd',
			title: 'asdasdas',
			image: 'https://www.com/1.jpg',
			category: 'soft',
			price: 750,
		},
	],
};

cardModel.setItems(data.items);
page.catalog = cardModel.items.map((card) => new CardView(events).render(card));

// api.get('/api/weblarek/product').then((data: ApiProductResponse) => {
// 	cardModel.setItems(data.items);
// 	page.catalog = cardModel.items.map((card) => new CardView(events).render(card));
// });

events.on('basket:card-add', (data: Product) => {
	basketModel.add(data);
});

events.on('basket:card-remove', (data: Product) => {
	basketModel.remove(data);
});

//--------------------------------------
events.on('basketpopup:open', (data: Product[]) => {
	basketPopup.render(data.map((card, index) => new BasketItemView(events).render(card, index)));
});

events.on('cardpopup:open', (data: Product) => {
	cardPopup.render(data);
});

//--------------------------------------------

events.on('basket:select', () => {
	basketModel.changed();
});

events.on('card:select', (data: Product) => {
	cardModel.setCardPreview(data);
});

//---------------------------------

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
