# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание базовых классов

Классы в данном приложении подразделяются на 3 слоя

1. Классы отображения - Popup, BasketPopup, CardPopup, OrderPopup, ContactPopup, SuccessPopup, ErrorPopup
2. Классы моделей данных - CardsModel, BasketModel, UserModel
3. Класс связывания слоев - EventEmitter

## Классы отображения

### Класс Popup

Универсальный класс предназначенный, для вывода на экран модального окна с разметкой полученной из классов отображения описанных далее. Именно в этот класс будет приходить готовая разметка для отображения

Универсальное модальное окно содержит иконку креста, при нажатии на которую происходит закрытие модального окна

Содержит методы:

- render - данный метод получает на вход готовую разметку, добавляет ее внутрь модального окна и делает его активным,
- close - данный метод очищает контент модального и делает его неактивным, при этом уничтожая все обработчики событий

### Класс BasketPopup

Класс предназначен для генерации разметки корзины, которая будет передаваться в класс Popup для дальнейшего отображения. Для создания экземпляра принимает селектор разметки корзины.

Стоит обратить внимание, что разметка корзины содержит кнопку 'Оформить', данная кнопка при клике вызовет метод emit класса EventEmitter, который вызовет обработчик события 'order:select', передавая ему данные о товарах. Обработчик 'order:select', вызовет метод модели UserModel 'setOrderPreview', который в свою очередь опять вызовет метод 'emit', который вызовет обработчик события 'orderpopup:open', который уже вызовет метод 'render' класса OrderPopup для отображения

Данное модальное окно открывается при нажатии на кнопку корзины на главной странице. Данная кнопка при клике вызовет метод emit класса EventEmitter, который вызовет обработчик события 'basket:select'.Обработчик 'basket:select', вызовет метод модели BasketModel 'setBasketPreview', который в свою очередь опять вызовет метод 'emit', который вызовет обработчик события 'basketpopup:open' и передаст туда данные о товарах в корзине, а тот в свою очередь вызывает метод 'render', передавая туда данные о товарах в корзине для отрисовки

Содержит методы:

- getMarkup - данный метод принимает данные о корзине и генерирует разметку, путем генерации разметки каждого отдельного товара через метод 'render' дополнительного класса BasketItemView.
- render - данный метод получая данные о товарах в корзине, вызывает метод 'getMarkup', который вернет готовую разметку. Далее разметка передается в метод 'render' класса Popup для отображения

### Класс BasketItemView

Класс предназначен для генерации разметки отдельной карточки товара в корзине

Стоит заметить, что разметка отдельного товара для корзины содержит кнопку удаления, на которую будет установлен слушатель клика. При клике на эту кнопку будет вызываться метод emit класса EventEmitter, который вызовет обработчик события 'basket:card-remove'. Обработчик 'basket:card-remove', вызовет метод модели BasketModel 'remove', который в свою очередь удалит данную карточку из корзины, а затем вызовет метод 'change', который вызовет обработчик события 'basketpopup:open', который получит новые данные и перерисует корзину с помощью метода render класса BasketPopup

Содержит методы:

- render - данный метод получает данные об одном товаре и возвращает его разметку со всеми слушателями

### Класс CardPopup

Класс предназначен для генерации разметки модального окна отдельной карточки товара

При клике на карточку задействуется обработчик события 'click', который вызывает метод emit класса EventEmitter, который в совою осередь вызовет обработчик события 'card:select', далее данные о выбранной карточке поступают в модель CardModel где срабатывает метод setCardPreview вызванный событием 'card:select'. Метод setCardPreview, вызывает метод 'render' данного класса, передавая полную информацию о выбранной карточке (найденную в модели CardModel)

Так же в модальном окне карточки содержится кнопка 'В корзину', при нажатии на нее будет вызван метод emit класса EventEmitter, который в совою осередь вызовет обработчик события 'basket:card-add'.Обработчик 'basket:card-add', вызовет метод модели BasketModel 'add', который в свою очередь добавит данную карточку в корзину, а затем вызовет метод 'change', который вызовет обработчик события 'basketpopup:open', который получит новые данные и перерисует корзину с помощью метода render класса BasketPopup

Содержит методы:

- getMarkup - данный метод принимает данные о выбранной карточке и генерирует разметку
- render - данный метод получая данные о товарах в корзине, вызывает метод 'getMarkup', который вернет готовую разметку. Далее разметка передается в метод 'render' класса Popup для отображения

### Класс OrderPopup

Класс предназначен для генерации разметки модального окна выбора способа оплаты и адреса доставки

Разметка содержит в себе форму с выбором способа оплаты, адресом доставки и кнопкой 'Далее'. При нажатии на кнопку будет вызван метод emit класса EventEmitter, который в совою осередь вызовет обработчик события 'contact:select' и передаст туда данные пользователя. Обработчик 'contact:select', вызовет метод модели UserModel setContactPreview, который в свою очередь сохранит пришедшие данные, а затем вызовет метод emit класса EventEmitter, который в совою очередь вызовет обработчик события 'сontactpopup:open', который вызовет метод 'render' класса СontactPopup для отображения

Содержит методы:

- getMarkup - данный метод генерирует разметку модального окна, добавляя слушатель к кнопке 'Далее'
- render - данный метод вызывает метод 'getMarkup', который вернет готовую разметку. Далее разметка передается в метод 'render' класса Popup для отображения

### Класс ContactPopup

Класс предназначен для генерации разметки модального окна для сбора информации об Email и телефоне пользователя

Разметка содержит в себе форму с двумя полями ввода и кнопкой 'Оплатить'. При нажатии на которую будет вызван метод emit класса EventEmitter, который в совою осередь вызовет обработчик события 'contact:makeorder', передавая туда данные пользователя. Обработчик 'contact:makeorder', вызовет метод модели UserModel makeOrder, который в свою очередь сохранит пришедшие данные, а затем сделает запрос в api c сохраненными данными заказа. После ответа от сервера будет вызвано 'emit' событие 'order:success' либo 'order:error', которые вызовут либо метод 'render' класса SuccessPopup либо ErrorPopup и передадут туда данные о стоимости заказа

- getMarkup - данный метод генерирует разметку модального окна, добавляя слушатель к кнопке 'Оплатить'
- render - данный метод вызывает метод 'getMarkup', который вернет готовую разметку. Далее разметка передается в метод 'render' класса Popup для отображения

### Класс SuccessPopup

Класс служит для отображения информации об успешной покупке

Разметка содержит единственную кнопку 'За новыми покупками', которая будет вызывать метод 'close' у универсального класса Popup, удаляя данные и закрывая модальное окно

Содержит методы:

- getMarkup - данный метод генерирует разметку модального окна принимая информацию о стоимости товаров
- render - данный метод вызывает метод 'getMarkup', который вернет готовую разметку. Далее разметка передается в метод 'render' класса Popup для отображения

### Класс ErrorPopup

Класс служит для отображения информации об ошибке при попытке купить товары

Разметка не содержит элементов взаимодействия, а только картинку красного креста с просьбой связаться по определенному телефону

Содержит методы:

- getMarkup - данный метод генерирует разметку модального окна.
- render - данный метод вызывает метод 'getMarkup', который вернет готовую разметку. Далее разметка передается в метод 'render' класса Popup для отображения

### Класс CatalogView

Класс служит для отображения начальных карточек на главной странице

При загрузке страницы делается api запрос на получение каталога с товарами. Далее с помощью метода 'setItems' класса CardModel, они заносятся в поле items. После этого setItems вызывает 'emit' событие 'catalog:changed' и передает туда массив с картами, который вызывает функцию 'render' класса CatalogView, который в свою очередь вызывает функцию getMarkup

Содержит методы:

- getMarkup - принимает массив карточек и для каждой вызывает метод 'render' у дополнительного класса CardView, который возвращает готовую разметку карточки
- render - для отрисовки на главной странице каталога с карточками используя метод getMarkup
  куда передаются данные о карточках

### Класс CardView

Класс служит для генерации разметки одной карточки

При вызове метода 'render', берется темплейт карты и заносятся туда необходимые значения, устанавливаются слушатели, после чего возвращается готовая разметка

Содержит методы:

- render - для генерации карточки

## Классы моделей данных

### Класс CardModel

Класс предназначен для хранения данных о карточках(товарах).

Содержит единственное поле items которое является массивов объектов типа Item. Тип Item содержит в себе поля:

- id - строка -> - идентификатор товара
- description - строка -> описание товара
- image - строка -> ссылка на картинку товара
- title - строка -> название товара
- category - строка -> категория товара
- price - число -> цена товара

Содержит следующие методы:

- setItems - принимает данные (например из сервера) и заполняет массив карточек данными.
- getItem - принимает id карточки и возвращает ее данные
- setCardPreview - вызывает событие 'cardpopup:open' для отображения модального окна (более подробно описано в классе CardPopup)

### Класс BasketModel

Класс предназначен для хранения данных о товарах в корзине.

Содержит единственное поле items которое является массивов объектов типа Item (описание типа в классе CardModel)

Содержит следующие методы:

- add - добавляет элемент в массив items и вызывает метод change для перерисовки
- remove - удаляет элемент по id из массива items и вызывает метод change для перерисовки
- change - вызывается при любом изменении корзины. В себе вызывает событие 'basketpopup:open' и передаст туда актуальные данные о корзине
- setBasketPreview - вызывает событие 'basketpopup:open' для отображения модального окна (более подробно описано в классе CardPopup)

### Класс UserModel

Класс предназначен для хранения данных о пользователе и заказе

Содержит единственное поле info, которое является объектом типа OrderInfo. Тип OrderInfo содержит в себе поля:

- payment - способ оплаты товара, принимает 2 значения 'online' или 'cash'
- email - строка -> email пользователя
- phone - строка ->
- address - строка ->
- total - число -> сумма заказа
- items -> массив строк -> массив из идентификаторов заказанных товаров

Содержит следующие методы:

- setPayment - устанавливает значение payment
- setEmail - устанавливает значение email
- setPhone - устанавливает значение phone
- setAddress - устанавливает значение address
- setTotal - устанавливает значение total
- setItems - устанавливает значение items
- order - метод берет имеющиеся данные из обьекта инфо и делает api запрос. После получения ответа вызывается либо событие 'order:success' (при успешном ответе) либо 'order:error' (при ошибке)
- getUserInfo - возвращает объект с данными пользователя

## Классы связывания слоев

### Класс EventEmitter

Класс предназначен для реализации "наблюдателя". Содержит в себе такие методы как:

- on - для подписки на событие
- off - для отписки от события
- emit - уведомления подписчиков о наступлении события

Дополнительные методы onAll offAll и trigger служат для подписки на все события, сброса событий и вызова события с заданными параметрами

События:

- order:select
- orderpopup:open
- order:success
- order:error
- basketpopup:open
- basket:select
- basket:card-add
- basket:card-remove
- cardpopup:open
- card:select
- catalog:changed
- contact:select
- сontactpopup:open
- contact:makeorder

### Класс Api

Класс предназначен для работы с внешним Api. Получает при создании экземпляра baseUrl - базовый url и options - необходимые заголовки запроса

Содержит в себе методы:

- getCatalog - метод служит для загрузки начальных карточек. Делает запрос на сервер и возвращает промис
- handleResponse - для обработки ответа (либо ошибки при неудачном запросе)
- get - для выполнения get запроса, принимает в качестве аргумента только uri
- post - для выполнения post (по умолчанию) запроса, принимает в качестве аргумента uri - путь до требуемого ресурса, data - данные для отправки и method - метод запроса (может принимать значения POST PUT DELETE)
