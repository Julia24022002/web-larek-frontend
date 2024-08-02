import { Model } from '../base/Model';
import { IProduct, IProductData } from '../../types';
import { IEvents } from '../base/events';

export class ProductData extends Model implements IProductData {
	protected _products: IProduct[];


	constructor(events: IEvents) {
		super(events);
		this._products = [];
	}

	set products(value: IProduct[]) {
		this._products = value;
		this.events.emit('products:changed', this._products);
	}

	get products() {
		return this._products;
	}

	getProduct(id: string) {
		return this._products.find((product) => {
			return product.id === id;
		});
	}
}
