// Тип описывающий категории товаров
export type CategoryType =
 | 'другое'
 | 'софт-скил'
 | 'дополнительное'
 | 'кнопка'
 | 'хард-скил';

// Интерфейс, описывающий карточку товара в магазине (карточки товаров)
export interface IProduct {
	id: string; // уникальный id
	category: CategoryType; // категория товара
	title: string; // название  товара
	image: string; // ссылка на изображение товара
	price: number | null; // цена товара, может быть null
	description: string; // описание товара
}

// Тип описывающий методы оплаты
export type TOrderPayment = 'cash' | 'card';

// Для описания заказа используется интерфейс IOrder: (корзина->заказ)
export interface IOrder {
	items: IProduct[]; // список купленных товаров
	total: number; // стоимость заказа
	payment: string; // Способ оплаты
	address: string; // Адрес доставки
	email: string; // Электронная почта
	phone: string; // Телефон
}

// Интерфейс описывает данные корзины покупок
export interface IBasket { 
  items: string[]; // Список товаров в корзине
  total: number; // Итоговая стоимость корзины
}

// для валидации полей ввода.
export type OrderForm = Omit<IOrder, 'total' | 'items'>;

// идентификатор созданного заказа и количество списанной валюты.
export interface IOrderResult {
	id: string;
	total: number;
}
