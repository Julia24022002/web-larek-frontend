import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { IBasket , TProductInBasket} from '../../types/index'

export class Basket extends Component<IBasket> {
  
    protected _products: HTMLUListElement;
    protected _getTotalPrice: HTMLSpanElement;
    protected _button: HTMLButtonElement;
   
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._products = ensureElement<HTMLUListElement>('.basket__list', container);
        this._getTotalPrice = ensureElement<HTMLSpanElement>('.basket__price',container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', container);

        this._button.addEventListener('click', () => this.events.emit('modal-order:open'));
    }

    set products(items: HTMLElement[]) {
        this._products.innerHTML = '';
        items.forEach(item => {
            this._products.appendChild(item);
        });
    }

    // общая стоимость
    set total(total: number) {
        this._getTotalPrice.textContent = String(total) + ' синапсов';
    }

    // Блокируем или разблокируем
    toggleButton(state: boolean) {
        this._button.disabled = state;
    }
}





// - `set products(items: HTMLElement[])` - устанавливает список карточек добавленных товаров в корзину
// - `set total(total: number) `- устанавливает общую стоимость товаров в html элемент \_totalPrice.
// - `toggleButton(state: boolean) `- для блокировки кнопки "Оформить", если корзина пуста