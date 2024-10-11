// Интерфейс данных для товара
export interface IProduct {
    id: string; // уникальный id
    category: string; // категория товара
    title: string; // название  товара
    image: string;  // ссылка на изображение товара
    price: number | null; // цена товара, может быть null
    description?: string; // описание товара
}

// Интерфейс модели данных товаров 
export interface IProductData {
    products: IProduct[]; //массив обьектов карточек 
    getProduct(id: string): IProduct; //находит товар по id и возвращает его.
}

//  интерфейс, описывающий данные о способе оплаты и доставке заказа
export interface IPaymentForm {
    payment: string; // Способ оплаты
    address: string; // Адрес доставки
}

// интерфейс, описывающий контактные данные заказчика
export interface IContactForm {
    email: string; // электронная почта
    phone: string; // номер телефона
}

// интерфейс, все данные с формы заказа
export interface IOrderForm extends IPaymentForm, IContactForm { }

// Интерфейс итоговых данных с заказа 
export interface IOrder extends IOrderForm {
    total: number; // общая стоимость с корзины
    items: string[]; // список товаров
}

// интерфейс модели заказа
export interface IOrderData {
    _order: IOrder; //данные заказа
    _formErrors: TFormErrors;
    get order(): IOrder;
    get formErrors(): TFormErrors
    clearOrder(): void;
    setOrderField(field: keyof IOrderForm, value: string): void;
    validateOrder(): boolean;
}

// интерфейс корзины товаров
export interface IBasket {
    products: TProductInBasket[];
    total: number;
};

// Интерфейс модели данных для корзины 
export interface IBasketData {
    items: TProductInBasket[]; // товары в корзине
    addProduct(product: TProductInBasket): void; // добавление товара в корзину
    deleteProduct(id: string): void;//удаление товара из корзины
    getTotalPrice(): number;//получить сумму всех товаров, добавленных в корзину
    getTotalProducts(): number;//получить общее количество добавленных товаров в корзину
    checkProduct(id: string): boolean;// определяет по id, есть ли данный товар уже в корзине
    clearBasket(): void;// очищает корзину
}

// Данные успешного ответа от сервера при отправке заказа 
export interface IOrderResult {
    total: number; //общая стоимость
}

// Тип для товара в корзине 
export type TProductInBasket = Pick<IProduct, 'id' | 'title' | 'price'>;

//  Тип способа оплаты
export type TPayment = 'cash' | 'card';

// Тип ошибок формы
export type TFormErrors = Partial<Record<keyof IOrder, string>>;

