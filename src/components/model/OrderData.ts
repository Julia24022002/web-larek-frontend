import { IOrderData, IOrderForm, IOrder, TFormErrors } from '../../types';
import { IEvents } from '../base/events';
import { Model } from '../base/model';

export class OrderData extends Model implements IOrderData {
  _formErrors: TFormErrors;
  _order: IOrderForm = {
    email: '',
    phone: '',
    address: '',
    payment: '',
  };

  constructor(events: IEvents) {
    super(events);
  }

  get order(): IOrderForm {
    return this._order;
  }

  get formErrors(): TFormErrors {
    return this._formErrors;
  }

  setOrderField(field: keyof IOrderForm, value: string) {
    this._order[field] = value;
    this.validateOrder();
  }

  clearOrder() {
    this._order = {
      email: '',
      phone: '',
      address: '',
      payment: '',
    };
    this._formErrors = {};
  }

  validateOrder() {
    const errors: TFormErrors = {};

    if (!this.order.payment) {
      errors.payment = 'Выберете способ оплаты ';
    }

    if (!this.order.address) {
      errors.address = 'Введите адрес';
    }

    if (!this.order.email) {
      errors.email = 'Введите email';
    }

    if (!this.order.phone) {
      errors.phone = 'Введите номер телефона';
    }

    this._formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}

