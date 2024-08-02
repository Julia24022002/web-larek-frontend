import { Card } from './Card';
import { IEvents } from '../base/events';
import { IProduct } from '../../types/index';
import { ensureElement } from '../../utils/utils';

interface ICardBasket {
	index: number;
}

type TCardBasket = Pick<IProduct, 'id' | 'title' | 'price'> & { index: number };

export class CardBasket extends Card<TCardBasket> implements ICardBasket {
	protected _index: HTMLSpanElement;
	protected buttonDelCard: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this._index = ensureElement<HTMLSpanElement>(
			'.basket__item-index',
			container
		);
		this.buttonDelCard = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			container
		);
		this.buttonDelCard.addEventListener('click', () =>
			this.events.emit('purchases:delete', { id: this.id })
		);
	}

	set index(value: number) {
		this._index.textContent = String(value);
	}
}
