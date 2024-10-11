import { Model } from '../base/model';
import { IBasketData, TProductInBasket } from '../../types';
import { IEvents } from '../base/events';

export class BasketData extends Model implements IBasketData {
    protected _products: TProductInBasket[] = []; 

    constructor(events: IEvents) {
        super(events);
        this.events = events;
    }

    // Геттер для получения всех товаров в корзине
    get items(): TProductInBasket[] {
        return this._products;
    }

    // Метод для добавления продукта в корзину
    addProduct(product: TProductInBasket) {
        console.log('Товар, который добавляем в корзину:', product);
        this._products.push(product);
        this.events.emit('basket:changed');
    }

    // Метод для удаления продукта из корзины
    deleteProduct(id: string): void {
        this._products = this._products.filter((product) => product.id !== id);
        this.events.emit('basket:changed');
    }

    // Метод для получения общей цены всех товаров в корзине
    getTotalPrice(): number {
        return this._products.reduce((total, product) => total + product.price, 0);
    }

    // Метод для получения общего числа продуктов в корзине
    getTotalProducts(): number {
        return this._products.length;
    }

    // Метод для проверки наличия товара в корзине
    checkProduct(id: string): boolean {
        return this._products.some(product => product.id === id);
    }

    // Очищает корзину и вызывает событие обновления.
    clearBasket(): void {
        this._products = [];
        this.events.emit('basket:changed', this._products);
    }
}





// - `addProduct(product: TProductInBasket): void `- добавление товара в корзину
// - `deleteProduct(id: string): void` - удаление товара из корзины
// - `getTotalPrice(): number` - получить сумму всех товаров, добавленных в корзину
// - `getTotalProducts(): number;` - получить общее количество добавленных товаров в корзину
// - `checkProduct(id: string): boolean;` - определяет по id, есть ли данный товар уже в корзине
// - `clearBasket(): void` - очищает корзину





