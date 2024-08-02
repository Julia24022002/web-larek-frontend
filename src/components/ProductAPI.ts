import { Api, ApiListResponse } from '../components/base/api';
import { IProduct, IOrderData, TSuccessData } from '../types';

export interface IProductAPI {
	getProducts: () => Promise<IProduct[]>;
	getProductById: (id: string) => Promise<IProduct>;
	postOrder: (order: IOrderData) => Promise<TSuccessData>;
}

export class ProductAPI extends Api implements IProductAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((list: ApiListResponse<IProduct>) => {
			return list.items.map((item) => {
				return { ...item, image: this.cdn + item.image };
			});
		});
	}

	getProductById(id: string): Promise<IProduct> {
		return this.get('/product/' + id).then((product: IProduct) => {
			return { ...product, image: this.cdn + product.image };
		});
	}

	postOrder(order: IOrderData): Promise<TSuccessData> {
		return this.post('/order', order).then((success: TSuccessData) => {
			return success;
		});
	}
}
