import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { IOrderResult } from '../../types/index'

export class Success extends Component<IOrderResult> {
    protected _total: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._total = ensureElement<HTMLElement>('order-success__description');
        this.button = ensureElement<HTMLButtonElement>('order-success__close');
        this.button.addEventListener('click', () => this.events.emit('success:confirm'));
    }

    set total(value: number) {
        this._total.textContent = `Списано ${value} синапсов`;
    }
}




// - `set total(value: number)` - заполняет общую сумму заказа
