import { ensureElement, createElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { IBasket } from '../../types/index'

export class Basket extends Component<IBasket> {
    protected _products: HTMLElement;
    protected _total: HTMLSpanElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._products = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLSpanElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this._button.addEventListener('click', () => {
            events.emit('order:open');
        });

        this.initBasket();
    }

    set products(items: HTMLElement[]) {
        if (items.length) {
            items.forEach((item, index) => {
                const itemIndex = item.querySelector('.basket__item-index');

                if (itemIndex) {
                    itemIndex.textContent = (index + 1).toString();
                }
            });
            
            this._products.replaceChildren(...items);
            this.setDisabled(this._button, false);
        } else {
            this.initBasket();
        }
    }

    private initBasket() {
        this._products.replaceChildren(
            createElement<HTMLElement>('p', {
                textContent: 'Корзина пуста',
            })
        );
        this.setDisabled(this._button, true);
    }

    // общая стоимость
    set total(value: number) {
        this.setText(this._total, value + ' синапсов');
    }
}



