import { Model } from '../base/model';
import { IProduct, IProductData } from '../../types';
import { IEvents } from '../base/events';

export class ProductData extends Model implements IProductData {
    protected _products: IProduct[] = [];
    protected _preview: string | null = null;

    constructor(events: IEvents) {
        super(events);
        this._products = [];
    }

    getProduct(id: string) {
        return this._products.find((product) => product.id === id);
    }

    get products(): IProduct[] {
        return this._products;
    }

    set products(products: IProduct[]) {
        this._products = products;
        this.events.emit('products:changed');
    }

    setPreview(product: IProduct) {
        this._preview = product.id;
        this.events.emit('preview:changed', product);
    }

    get preview(): string | null {
        return this._preview;
    }
}
