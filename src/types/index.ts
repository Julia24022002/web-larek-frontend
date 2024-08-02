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
	products: IProduct[];
	getProduct(id: string): IProduct | undefined;
}
// Интерфес данных с форм заказа
export interface IOrderContactForm {
	email: string; // Электронная почта
	phone: string; // Телефон
}

export interface IOrderPaymentForm {
	payment: string; // Способ оплаты
	address: string; // Адрес доставки
}

export interface IOrderForm extends IOrderContactForm, IOrderPaymentForm {}

// Интерфейс итоговых данных с заказа
export interface IOrderData extends IOrderForm {
	customerInfo: any;
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
	purchases: IProduct[];
	addPurchase(value: IProduct): void;
	deletePurchase(id: string): void;
	getQuantity(): number;
	checkProduct(id: string): boolean;
	getTotal(): number;
	getIdList(): string[];
	clear(): void;
}

export interface ISuccessData {
	orderSuccess: TSuccessData;
}

export interface ISuccess {
	description: string;
}
export interface IOrderConstructor {
	new (): IOrderData;
}
export interface IOrderDataBuilder {
	purchasesInfo: TPurchasesInfo;
	deliveryInfo: IOrderPaymentForm;
	contactsInfo: IOrderContactForm;
	getOrderData(): IOrderData;
}

export interface ISuccess {
	description: string;
}

export interface IFormOrder {
	payment: TPayment | null;
	address: string;
	valid: boolean;
	clear(): void;
	render(data: object): HTMLElement;
}
export interface IModal {
	content: HTMLElement;
	open(): void;
	close(): void;
}

export interface IForm {
	valid: boolean;
	errorMessage: string;
	clear(): void;
}

export interface ICard {
	id: string;
	title: string;
	price: string;
}

//   ТИПЫ

// Данные успешного ответа от сервера при отправке заказа
export type TOrderResult = { id: string; total: number };

export type TId = { id: string };

export type TForm = { valid: boolean };

export type TModal = { content: HTMLElement };

export type TFormOrder = { payment: TPayment; address: string };

export type TPage = { counter: number; catalog: HTMLElement[] };

export type TSuccess = { description: string };

export type TPurchasesInfo = Pick<IOrderData, 'total' | 'items'>;

export type TSuccessData = { id: string; total: number };

//  Тип способа оплаты
export type TPayment = 'cash' | 'card';

// Тип ошибок формы
export type TFormErrors = Partial<Record<keyof IOrderData, string>>;

export type TCardCatalog = Omit<IProduct, 'description'>;

// Тип для товара в корзине
export type TProductInBasket = Pick<IProduct, 'id' | 'title' | 'price'> & {
	index: number;
};
