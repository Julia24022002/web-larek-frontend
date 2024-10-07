import { Api, ApiListResponse } from "./base/api";
import { IProduct, IOrder } from '../types/index';


export interface IProductApi {
    getProducts(): Promise<IProduct[]>;
    // getProductItem(id: string): Promise<IProduct> ;
	// getProductById(id: string): Promise<IProduct>;
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
	// getProductById(id: string): Promise<IProduct> {
	// 	return this.get('/product/' + id).then((product: IProduct) => {
	// 	  return {...product, image: this.cdn + product.image}
	// 	})
	//   }
	

	//   orderProducts(order: IOrder): Promise<IOrder> {
	// 	return this._baseApi
	// 		.post<IOrder>(`/order`, order)
	// 		.then((data: IOrder) => data);
	// }
}

