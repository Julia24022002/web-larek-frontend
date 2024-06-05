
// Тип описывающий категории товаров
export type CategoryType = 
'софт-скил' |
'другое' |
'дополнительное' |
'кнопка' |
'хард-скил';
   
// Интерфейс, описывающий карточку товара в магазине (карточки товаров)
export interface IProduct{
    id: string; // уникальный id
    category: CategoryType; // категория товара
    title: string; // название  товара
    image: string; // ссылка на изображение товара
    price: number | null; // цена товара, может быть null
    description: string;  // описание товара 
  }

// Содержит список товаров и итоговую стоимость
export interface IBasket {
	items: string[];
	total: number;
  }

// Тип описывающий способ оплаты
export type TOrderPayment  = 'cash' | 'card'; 

// Интерфейс, описывающий поля заказа товара (корзина)
export interface IOrder {
    items: IProduct[]; // Массив ID купленных товаров
    total: number; // Сумма заказа
    payment: TOrderPayment; // Способ оплаты
    address: string; // Адрес доставки
    email: string; // Электронная почта
    phone: string; // Телефон
  }

export type OrderForm = Omit<IOrder, 'total' | 'items'>;

export interface IOrderResult {
      id: string;
      total: number;
  }


