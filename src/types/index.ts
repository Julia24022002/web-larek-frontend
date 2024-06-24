// Интерфейс данных для товара
export interface IProduct {
	id: string; // уникальный id
	category: string; // категория товара
	title: string; // название  товара
	image: string; // ссылка на изображение товара
	price: number | null; // цена товара, может быть null
	description?: string; // описание товара
}
// Интерфейс модели данных товаров
export interface IProductData {
	products: IProduct[]; //массив обьектов карточек
	preview: string | null; // id карточки, выбранной для просмотра в модальном окне или добавленной в корзину
	getProduct(productId: string): IProduct; //получение выбранной карточки товара по id для просмотра
	setProducts(products: IProduct[]): void; // принимает массив и обновляет свойство products
}

// Интерфес данных с форм заказа
export interface IOrderContactForm {
	email: string; // Электронная почта
	phone: string; // Телефон
}

export interface IOrderPaymentForm {
	payment: TPayment; // Способ оплаты
	address: string; // Адрес доставки
}

export interface IOrderForm extends IOrderContactForm, IOrderPaymentForm {}

// Интерфейс итоговых данных с заказа
export interface IOrderData extends IOrderForm {
	total: number; // общая стоимость с корзины
	items: string[]; // список товаров
}

// Интерфейс модели заказа
export interface IOrder {
	_order: IOrderData;
	setProducts(items: string[]): void;
	clearOrderData(): void;
	setOrderField(field: keyof IOrderForm, value: string): void;
	validateOrder(): boolean;
}

// Интерфейс модели данных для корзины
export interface IBasketData {
	items: TProductInBasket[]; // список товаров в корзине
	getTotalPrice(): number; // метод для вычисления общей стоимости корзины
	addProduct(product: TProductInBasket): void;
	deleteProduct(id: string): void;
	getTotalPrice(): number;
	getTotalProducts(): number;
	checkProduct(id: string): boolean;
	clearBasket(): void;
}

// Данные успешного ответа от сервера при отправке заказа
export interface IOrderResult {
	id: string;
	total: number;
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

// Тип ошибок формы
export type FormErrors = Partial<Record<keyof IOrderData, string>>;

export interface IBasketView {
	products: HTMLElement[];
	total: number;
}
