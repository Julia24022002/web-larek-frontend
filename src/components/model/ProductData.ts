import { Model } from '../base/Model';
import { IProduct, IProductData } from '../../types';
import { IEvents } from '../base/Events';

export class ProductData extends Model implements IProductData {
	protected _products: IProduct[];
	protected _preview: string | null;
  
	constructor(events: IEvents) {
	  super(events);
	  this._products = [];
	  this._preview = null; 
	}
  
	getProduct(id: string): IProduct | undefined {
	  return this._products.find((product) => product.id === id);
	}
  
	get products(): IProduct[] {
	  return this._products;
	}
  
	set products(value: IProduct[]) {
		this._products = value;
		this.events.emit('products:changed', this._products);
	  }
  
	set preview(productId: string | null) {
		this._preview = productId;
		this.events.emit('preview:changed', this._preview);
	  }
  
	get preview(): string | null {
	  return this._preview;
	}
  }

// Класс отвечает за хранение и логику работы с данными товаров.

// - `protected _products: IProduct[] `- массив объектов товаров.
// - `protected _preview: string | null` - id товара, выбранной для просмотра в модальном окне


// - `getProduct(id: string): IProduct` - находит товар по id и возвращает его.
// - `get products(): IProduct[]` - возвращает массив продуктов \_products
// - `set products(value: IProduct[]): void` - записывает массив продуктов в \_products
// - `set preview(productId: string | null)` - Записывает в поле \_preview выбранный товар для показа в модальном окне
// - `get preview()` - Получение ID выбранного товара для просмотра в модальном окне
