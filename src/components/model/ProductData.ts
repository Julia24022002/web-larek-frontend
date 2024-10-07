import { Model } from '../base/model';
import { IProduct, IProductData } from '../../types';
import { IEvents } from '../base/events';

export class ProductData extends Model implements IProductData {
    protected _products: IProduct[] = [];
    protected _preview: string | null = null;
    

    constructor(events: IEvents) {
        super(events);
        this._products =[];
    }

    getProduct(id: string): IProduct | undefined {
        return this._products.find((product) => product.id === id);
    }

    get products() {
        return this._products;
      }

    set products(value: IProduct[]) {
        this._products = value;
        this.events.emit('products:changed', this._products);
    }

    set preview(productId: string | null) {
        this._preview = productId;
        this.events.emit('preview:changed', { productId });
    }

    get preview(): string | null {
        return this._preview;
    }
}



// - `getProduct(id: string): IProduct` - находит товар по id и возвращает его.
// - `get products(): IProduct[]` - возвращает массив продуктов \_products
// - `set products(value: IProduct[]): void` - записывает массив продуктов в \_products
// - `set preview(productId: string | null)` - Записывает в поле \_preview выбранный товар для показа в модальном окне
// - `get preview()` - Получение ID выбранного товара для просмотра в модальном окне
