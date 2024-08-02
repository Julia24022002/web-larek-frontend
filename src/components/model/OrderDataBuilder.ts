import { Model } from '../base/Model';
import { IEvents } from '../base/events';
import {
	IOrderDataBuilder,
	IOrderConstructor,
	IOrderData,
	TPurchasesInfo,
	IOrderPaymentForm,
	IOrderContactForm,
} from '../../types';

export class OrderDataBuilder extends Model implements IOrderDataBuilder {
	static getOrderData() {
		throw new Error('Method not implemented.');
	}
	protected order: IOrderData;

	constructor(events: IEvents, orderConstructor: IOrderConstructor) {
		super(events);
		this.order = new orderConstructor();
	}

	set purchasesInfo(info: TPurchasesInfo) {
		this.order.total = info.total;
		this.order.items = info.items;
	}

	set deliveryInfo(info: IOrderPaymentForm) {
		this.order.payment = info.payment;
		this.order.address = info.address;
	}

	set contactsInfo(info: IOrderContactForm) {
		this.order.email = info.email;
		this.order.phone = info.phone;
	}

	getOrderData() {
		return this.order;
	}
}
