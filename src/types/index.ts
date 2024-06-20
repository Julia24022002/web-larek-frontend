// Интерфейс данных для товара
export interface IProduct {
	id: string; // уникальный id
	category: string; // категория товара
	title: string; // название  товара
	image: string; // ссылка на изображение товара
	price: number | null; // цена товара, может быть null
	description?: string; // описание товара
}

// Интерфес данных для заказа
export interface IOrder {
	payment: TPayment; // Способ оплаты
	address: string; // Адрес доставки
	email: string; // Электронная почта
	phone: string; // Телефон
}

//Данные для корзины с товарами
export interface IBasket {
	items: TProductInBasket[]; 
	total: number; 
}

// Данные успешного ответа от сервера при отправке заказа
export interface IOrderResult {
	id: string;
	total: number;
}

// Данные для каталога товара
export interface IProductList {
	items: IProduct[];
	preview: string | null;
}


// Интерфейс модели данных товаров
export interface IProductData {
	products: IProduct[]; //массив обьектов карточек
	preview: string | null; // id карточки, выбранной для просмотра в модальном окне или добавленной в корзину
	getProduct(productId: string): IProduct; //получение выбранной карточки товара по id для просмотра
	setProducts(products: IProduct[]): void; // принимает массив и обновляет свойство products
}

// Интерфейс данных для формы заказа
export interface IOrderData {
	payment: TPayment; // Способ оплаты
	address: string; // Адрес доставки
	email: string; // Электронная почта
	phone: string; // Телефон
  }

// Интерфейс модели данных корзины
export interface IBasketData {
	items: IProductInBasket[]; // список товаров в корзине
	total: number; // общая стоимость корзины



	clearBasket(): void;
}




// Тип описывающий категории товаров
export type TCategoryType =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Тип для товара в корзине
export type TProductInBasket = Pick<IProduct, 'id' | 'title' | 'price'> & {
	index: number;
};

//  Тип способа оплаты
export type TPayment = 'cash' | 'card';

// тип модального окна выбора способа оплаты и ввода адреса
export type TDeliveryInfo = Pick<IOrder, 'payment' | 'address'>;

//  тип модального окна ввод почты и телефона (контакты)
export type TContactsInfo = Pick<IOrder, 'email' | 'phone'>;

// Тип для общей суммы заказа
export type TTotalPrice = Pick<IBasket, 'total'>;






