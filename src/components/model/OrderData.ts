import { IOrderData, TPayment, IOrderForm, IOrder } from '../../types';
import { IEvents } from '../base/events';


export class OrderData implements IOrder {

  _order: IOrderData;
  formErrors: { [key: string]: string } = {};

  constructor(events: IEvents) {
    this._order = {
        payment: null,
        address: '',
        email: '',
        phone: '',
        total: 0,
        items: []
    };
}

  get order(): IOrderData {
    return this._order;
  }

  clearOrderData(): void {
    this._order = {
      payment: null,
      address: '',
      email: '',
      phone: '',
      total: 0,
      items: []
    };
  }

  // Метод для установки значения в поле заказа
  setOrderField(field: keyof IOrderForm, value: string): void {
    if (field === 'payment') {
      if (value.toLowerCase() === 'card' || value.toLowerCase() === 'cash') {
        this._order[field] = value.toLowerCase() as TPayment;
      } else {
        this.formErrors.payment = 'Выберите способ оплаты';
      }
    } else {
      this._order[field] = value;
    }
  }

  validateOrder(): boolean {
    this.formErrors = {};

    // Проверка полей 
    if (!this._order.email) {
      this.formErrors.email = 'Введите электронную почту';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this._order.email)) {
      this.formErrors.email = 'Неверный формат почты';
    }

    if (!this._order.phone) {
      this.formErrors.phone = 'Введите номер телефона';
    }

    if (!this._order.address) {
      this.formErrors.address = 'Введите адрес';
    }

    if (!this._order.payment) {
      this.formErrors.payment = 'Выберите способ оплаты';
    }

    return Object.keys(this.formErrors).length === 0;
  }
}


// Методы:
// - `get order() `- получить все данные заказа
// - `clearOrderData(): void` - очищает массив данных после заказа
// - `setOrderField(field: keyof IOrderForm, value: string) `- записывает данные с полей форм в массив данных заказа \_order
// - `validateOrder() `- валидация форм

