import { Api, ApiListResponse } from "./base/api";
import { IProduct, IOrder, IOrderResult } from '../types/index';


export interface IProductApi {
	getProducts(): Promise<IProduct[]>;
}

export class ProductAPI extends Api implements IProductApi {
	protected cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderProduct(order: IOrder): Promise<IOrderResult> {
		return this.post(`/order`, order).then((data: IOrderResult) => data);
	}
}

