import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { Card } from './Card';

export class BasketCard extends Card {
    protected _index: HTMLElement;
    // protected _title: HTMLHeadingElement;
    protected _deleteButton: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
        // this._title = ensureElement<HTMLHeadingElement>(`.card__title`, container);
        // this._price = ensureElement<HTMLElement>(`.card__price`, container);
        this._deleteButton = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container);
        this._deleteButton.addEventListener('click', () => this.events.emit('purchases:delete', { id: this.id }))
    }

    set index(value: number) {
        this._index.textContent = String(value)
    }
    // set title(value: string) {
    //     this._title.textContent = value;
    // }

    // set price(value: number) {
    //     this._price.textContent = String(value) + ' синапсов'; // Assuming 'синапсов' is your currency symbol
    // }
}