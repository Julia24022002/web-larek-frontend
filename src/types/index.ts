
// Тип описывающий категории товаров
type CategoryType = 
    'софт-скил'
    'другое'
    'дополнительное'
    'кнопка'
    'хард-скил';

// Интерфейс, описывающий поля товара в магазине (карточки товаров)
interface IProduct{
    id: string; // уникальный id
    category: CategoryType; // категория товара
    title: string; // название  товара
    image: string; // ссылка на изображение товара
    price: number | null; // цена товара, может быть null
    description: string;  // описание товара 
    // selected: boolean; // был данный товар добавлен в корзину или нет
  }

// Тип описывающий способ оплаты
  type TOrderPayment =  'cash' | 'card';

  // Интерфейс, описывающий поля заказа товара (корзина)
interface IOrder {
    items: string[]; // Массив ID купленных товаров
    total: number; // Сумма заказа
    payment: string; // Способ оплаты
    address: string; // Адрес доставки
    email: string; // Электронная почта
    phone: string; // Телефон
  }
  
// Интерфейс, описывающий поля формы (форма)
interface IOrderForm {
    payment: string;  // Способ оплаты
    address: string;  // Адрес
    email: string; // Почта
    phone: string;  // Телефон
  }



