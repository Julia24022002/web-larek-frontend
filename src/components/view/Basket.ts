import { Component } from '../base/component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export type TBasket = {
	cardsList: HTMLElement[];
	total: number;
	emptyCheck: boolean;
};

export class Basket extends Component<TBasket> {
	protected _cardsList: HTMLUListElement;
	protected _totalPrice: HTMLSpanElement;
	protected buttonCheckout: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this._cardsList = ensureElement<HTMLUListElement>(
			'.basket__list',
			container
		);
		this._totalPrice = ensureElement<HTMLSpanElement>(
			'.basket__price',
			container
		);
		this.buttonCheckout = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);
		this.buttonCheckout.addEventListener('click', () =>
			this.events.emit('modal-order:open')
		);
	}

	set cardsList(cards: HTMLElement[]) {
		this._cardsList.replaceChildren(...cards);
	}

	set emptyCheck(state: boolean) {
		this.buttonCheckout.disabled = state;
	}

	set total(value: number) {
		this._totalPrice.textContent = String(value) + ' синапсов';
	}
}
